import "dotenv/config";

import { getMongoClient, getMongoDb } from "../src/db/mongo.js";

type QuizAttemptDocument = {
  _id: string;
  answers?: Array<unknown>;
  attemptNumber?: number;
  completedAt?: number;
  courseId?: string;
  passed?: boolean;
  percentage?: number;
  quizId?: string;
  score?: number;
  startedAt?: number;
  studentId?: string;
  tenantId?: string;
  timeSpent?: number;
};

type AttemptGroupKey = {
  quizId: string;
  studentId: string;
  tenantId: string;
};

type CleanupCandidate = {
  answersLength: number;
  attemptNumber: number;
  completedAt?: number;
  id: string;
  percentage: number;
  quizId: string;
  score: number;
  startedAt: number;
  studentId: string;
  tenantId: string;
};

function parseArgs(argv: string[]) {
  const parsed = {
    apply: false,
    quizId: undefined as string | undefined,
    studentId: undefined as string | undefined,
    tenantId: undefined as string | undefined,
  };

  for (let index = 0; index < argv.length; index += 1) {
    const argument = argv[index];

    if (argument === "--apply") {
      parsed.apply = true;
      continue;
    }

    if (argument === "--tenant" && argv[index + 1]) {
      parsed.tenantId = argv[index + 1];
      index += 1;
      continue;
    }

    if (argument === "--student" && argv[index + 1]) {
      parsed.studentId = argv[index + 1];
      index += 1;
      continue;
    }

    if (argument === "--quiz" && argv[index + 1]) {
      parsed.quizId = argv[index + 1];
      index += 1;
    }
  }

  return parsed;
}

function getAnswersLength(attempt: QuizAttemptDocument) {
  return Array.isArray(attempt.answers) ? attempt.answers.length : 0;
}

function isZeroStateIncompleteAttempt(attempt: QuizAttemptDocument) {
  return (
    !attempt.completedAt &&
    getAnswersLength(attempt) === 0 &&
    (attempt.score ?? 0) === 0 &&
    (attempt.percentage ?? 0) === 0 &&
    (attempt.timeSpent ?? 0) === 0
  );
}

function toCandidate(attempt: QuizAttemptDocument): CleanupCandidate {
  return {
    answersLength: getAnswersLength(attempt),
    attemptNumber: attempt.attemptNumber ?? 0,
    completedAt: attempt.completedAt,
    id: attempt._id,
    percentage: attempt.percentage ?? 0,
    quizId: attempt.quizId ?? "",
    score: attempt.score ?? 0,
    startedAt: attempt.startedAt ?? 0,
    studentId: attempt.studentId ?? "",
    tenantId: attempt.tenantId ?? "",
  };
}

function buildGroupId(key: AttemptGroupKey) {
  return `${key.tenantId}::${key.studentId}::${key.quizId}`;
}

function pickDeletionCandidates(attempts: QuizAttemptDocument[]) {
  const sortedAttempts = [...attempts].sort(
    (left, right) => (left.startedAt ?? 0) - (right.startedAt ?? 0),
  );
  const completedAttempts = sortedAttempts.filter(
    (attempt) => attempt.completedAt,
  );
  const incompleteAttempts = sortedAttempts.filter(
    (attempt) => !attempt.completedAt,
  );

  if (incompleteAttempts.length <= 1) {
    return [];
  }

  const latestIncompleteAttempt = incompleteAttempts.reduce(
    (latest, attempt) => {
      if (!latest) {
        return attempt;
      }

      return (attempt.startedAt ?? 0) > (latest.startedAt ?? 0)
        ? attempt
        : latest;
    },
    undefined as QuizAttemptDocument | undefined,
  );

  return incompleteAttempts.filter((attempt) => {
    if (!isZeroStateIncompleteAttempt(attempt)) {
      return false;
    }

    const hasCompletedAttemptAfter = completedAttempts.some(
      (completedAttempt) =>
        (completedAttempt.startedAt ?? 0) >= (attempt.startedAt ?? 0),
    );

    if (hasCompletedAttemptAfter) {
      return true;
    }

    return attempt._id !== latestIncompleteAttempt?._id;
  });
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const db = await getMongoDb();
  const collection = db.collection<QuizAttemptDocument>("quizAttempts");

  const query: Partial<Record<"quizId" | "studentId" | "tenantId", string>> =
    {};
  if (args.tenantId) query.tenantId = args.tenantId;
  if (args.studentId) query.studentId = args.studentId;
  if (args.quizId) query.quizId = args.quizId;

  const attempts = await collection
    .find(query)
    .sort({ startedAt: 1 })
    .toArray();
  const groupedAttempts = new Map<string, QuizAttemptDocument[]>();

  for (const attempt of attempts) {
    if (!attempt.tenantId || !attempt.studentId || !attempt.quizId) {
      continue;
    }

    const groupKey = buildGroupId({
      quizId: attempt.quizId,
      studentId: attempt.studentId,
      tenantId: attempt.tenantId,
    });
    const group = groupedAttempts.get(groupKey) ?? [];
    group.push(attempt);
    groupedAttempts.set(groupKey, group);
  }

  const cleanupPlan = [...groupedAttempts.entries()]
    .map(([groupId, groupAttempts]) => ({
      deleteAttempts: pickDeletionCandidates(groupAttempts),
      groupId,
      totalAttempts: groupAttempts.length,
    }))
    .filter((group) => group.deleteAttempts.length > 0);

  if (cleanupPlan.length === 0) {
    console.log("No stale duplicate quiz attempts found.");
    return;
  }

  console.log(
    `${args.apply ? "Applying" : "Dry run for"} ${cleanupPlan.length} cleanup group(s).`,
  );

  let totalDeletes = 0;

  for (const group of cleanupPlan) {
    totalDeletes += group.deleteAttempts.length;
    console.log(`\nGroup: ${group.groupId}`);
    console.log(`Total attempts in group: ${group.totalAttempts}`);

    for (const attempt of group.deleteAttempts.map(toCandidate)) {
      console.log(
        `  DELETE ${attempt.id} startedAt=${attempt.startedAt} attemptNumber=${attempt.attemptNumber} score=${attempt.score} percentage=${attempt.percentage} answers=${attempt.answersLength}`,
      );
    }

    if (args.apply) {
      const ids = group.deleteAttempts.map((attempt) => attempt._id);
      const result = await collection.deleteMany({ _id: { $in: ids } });
      console.log(`  Deleted ${result.deletedCount} document(s).`);
    }
  }

  console.log(
    `\nTotal stale duplicate attempts${args.apply ? " deleted" : " identified"}: ${totalDeletes}`,
  );
}

main()
  .catch((error) => {
    console.error("Failed to clean up quiz attempts:", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    const client = await getMongoClient();
    await client.close();
  });
