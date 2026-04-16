import { MongoClient } from "mongodb";

const uri = "mongodb+srv://admin:Mkv0hJ4k43PMsIVj@cluster0.wooql5v.mongodb.net/?appName=Cluster0";
const dbName = "afri-learn";

async function main() {
  const client = new MongoClient(uri);
  
  try {
    await client.connect();
    const db = client.db(dbName);
    
    const quizId = "20ec7aea-3801-408e-9014-f62f69c520c7";
    const studentId = "nigerian-correctional-service-student-student";
    
    const attempts = await db.collection("quizAttempts")
      .find({ quizId, studentId })
      .sort({ startedAt: -1 })
      .limit(5)
      .toArray();
    
    console.log(`Found ${attempts.length} attempts for quiz ${quizId} and student ${studentId}\n`);
    
    attempts.forEach((attempt, index) => {
      console.log(`Attempt ${index + 1}:`);
      console.log(`  id: ${attempt._id}`);
      console.log(`  attemptNumber: ${attempt.attemptNumber}`);
      console.log(`  startedAt: ${attempt.startedAt}`);
      console.log(`  completedAt: ${attempt.completedAt}`);
      console.log(`  score: ${attempt.score}`);
      console.log(`  percentage: ${attempt.percentage}`);
      console.log(`  passed: ${attempt.passed}`);
      console.log(`  answers length: ${attempt.answers?.length || 0}`);
      console.log("");
    });
    
    // Check for duplicate creation pattern
    if (attempts.length >= 2) {
      const timeDiff = Math.abs(
        new Date(attempts[0].startedAt).getTime() - 
        new Date(attempts[1].startedAt).getTime()
      );
      const timeDiffSeconds = timeDiff / 1000;
      
      console.log(`\n--- Duplicate Check ---`);
      console.log(`Time between most recent and second most recent attempt: ${timeDiffSeconds} seconds`);
      
      if (timeDiffSeconds < 5) {
        console.log(`\n⚠️  DUPLICATE DETECTED: The two most recent attempts were created within ${timeDiffSeconds} seconds of each other.`);
        console.log(`This suggests a browser reload+submit sequence created MULTIPLE attempts (duplicate creation).`);
      } else {
        console.log(`\n✅ NO DUPLICATE: The most recent browser reload+submit sequence created only ONE new attempt.`);
      }
    }
    
  } finally {
    await client.close();
  }
}

main().catch(console.error);
