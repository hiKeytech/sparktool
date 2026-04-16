import { MongoClient } from "mongodb";

const MONGODB_URI = "mongodb+srv://admin:Mkv0hJ4k43PMsIVj@cluster0.wooql5v.mongodb.net/?appName=Cluster0";
const MONGODB_DB_NAME = "afri-learn";
const STUDENT_ID = "nigerian-correctional-service-student-student";
const QUIZ_ID = "20ec7aea-3801-408e-9014-f62f69c520c7";

interface QuizQuestion {
  correctAnswer: number | string;
  id: string;
  options?: string[];
  points: number;
  question: string;
  type: string;
}

interface QuizAnswer {
  answer: number | string;
  isCorrect: boolean;
  pointsEarned: number;
  questionId: string;
}

async function main() {
  console.log("=== Test Grading Script ===\n");
  
  const client = new MongoClient(MONGODB_URI, { appName: "sparktool-test" });
  
  try {
    await client.connect();
    console.log("Connected to MongoDB\n");
    
    const db = client.db(MONGODB_DB_NAME);
    
    // 1. Load most recent quiz attempt
    console.log("1. Loading most recent quiz attempt...");
    const attemptsCollection = db.collection("quizAttempts");
    const attempts = await attemptsCollection
      .find({ studentId: STUDENT_ID, quizId: QUIZ_ID })
      .sort({ startedAt: -1 })
      .limit(1)
      .toArray();
    
    if (attempts.length === 0) {
      console.log("   No attempt found for student/quiz combination");
      return;
    }
    
    const attempt = attempts[0];
    console.log(`   Found attempt: ${attempt._id}`);
    console.log(`   Started at: ${new Date(attempt.startedAt).toISOString()}`);
    console.log(`   Current score: ${attempt.score}, passed: ${attempt.passed}\n`);
    
    // 2. Load the quiz
    console.log("2. Loading quiz...");
    const quizzesCollection = db.collection("quizzes");
    const quiz = await quizzesCollection.findOne({ _id: QUIZ_ID });
    
    if (!quiz) {
      console.log("   Quiz not found");
      return;
    }
    
    console.log(`   Quiz title: ${quiz.title}`);
    console.log(`   Passing score: ${quiz.passingScore}%`);
    console.log(`   Questions: ${quiz.questions?.length || 0}\n`);
    
    const questions: QuizQuestion[] = quiz.questions ?? [];
    
    if (questions.length === 0) {
      console.log("   No questions in quiz");
      return;
    }
    
    // Show the single question and its correct answer
    console.log("   Question details:");
    questions.forEach((q, i) => {
      console.log(`   [${i + 1}] ID: ${q.id}`);
      console.log(`       Question: ${q.question}`);
      console.log(`       Type: ${q.type}`);
      console.log(`       Correct answer: ${q.correctAnswer} (type: ${typeof q.correctAnswer})`);
      console.log(`       Points: ${q.points}`);
      if (q.options) {
        console.log(`       Options: ${JSON.stringify(q.options)}`);
      }
    });
    console.log();
    
    // 3. Build rawAnswers with correct answers
    console.log("3. Building rawAnswers with correct answers...");
    const rawAnswers: Record<string, number | string> = {};
    questions.forEach((q) => {
      rawAnswers[q.id] = q.correctAnswer;
    });
    console.log(`   rawAnswers: ${JSON.stringify(rawAnswers)}\n`);
    
    // 4. Run grading logic
    console.log("4. Running grading logic...");
    let correctAnswers = 0;
    let earnedPoints = 0;
    
    const gradedAnswers: QuizAnswer[] = questions.flatMap((question) => {
      const submitted = rawAnswers[question.id];
      if (submitted === undefined) return [];
      
      const isCorrect = submitted === question.correctAnswer;
      const pointsEarned = isCorrect ? (question.points ?? 1) : 0;
      
      if (isCorrect) {
        correctAnswers += 1;
        earnedPoints += pointsEarned;
      }
      
      return [{
        answer: submitted,
        isCorrect,
        pointsEarned,
        questionId: question.id,
      }];
    });
    
    const totalPoints = questions.reduce((sum, q) => sum + (q.points ?? 1), 0);
    const totalQuestions = questions.length;
    const percentage = totalPoints > 0 ? Math.round((earnedPoints / totalPoints) * 100) : 0;
    const passed = percentage >= (quiz.passingScore ?? 70);
    
    console.log(`   Graded answers: ${JSON.stringify(gradedAnswers, null, 2)}`);
    console.log(`   Score: ${earnedPoints}/${totalPoints}`);
    console.log(`   Percentage: ${percentage}%`);
    console.log(`   Correct: ${correctAnswers}/${totalQuestions}`);
    console.log(`   Passed: ${passed}\n`);
    
    // 5. Attempt repository update
    console.log("5. Attempting repository update...");
    const updatePayload = {
      answers: gradedAnswers,
      completedAt: Date.now(),
      correctAnswers,
      passed,
      percentage,
      score: earnedPoints,
      timeSpent: 60,
      totalPoints,
      totalQuestions,
    };
    console.log(`   Update payload: ${JSON.stringify(updatePayload, null, 2)}\n`);
    
    try {
      const result = await attemptsCollection.updateOne(
        { _id: attempt._id },
        { $set: updatePayload }
      );
      
      console.log("   ✅ UPDATE SUCCEEDED");
      console.log(`   Matched: ${result.matchedCount}, Modified: ${result.modifiedCount}`);
      
      // Verify the update
      const updated = await attemptsCollection.findOne({ _id: attempt._id });
      console.log(`\n   Updated attempt state:`);
      console.log(`   - score: ${updated?.score}`);
      console.log(`   - percentage: ${updated?.percentage}`);
      console.log(`   - passed: ${updated?.passed}`);
      console.log(`   - answers: ${JSON.stringify(updated?.answers)}`);
      
    } catch (err: any) {
      console.log("   ❌ UPDATE THREW AN ERROR");
      console.log(`   Error name: ${err.name}`);
      console.log(`   Error message: ${err.message}`);
      console.log(`   Error stack:\n${err.stack}`);
    }
    
  } catch (err: any) {
    console.log("❌ SCRIPT ERROR");
    console.log(`Error name: ${err.name}`);
    console.log(`Error message: ${err.message}`);
    console.log(`Error stack:\n${err.stack}`);
  } finally {
    await client.close();
    console.log("\nDisconnected from MongoDB");
  }
}

main();
