/**
 * This is a correct way to connect to MongoDB Atlas,
 * because the client is cached between requests.
 * For more information: https://youtu.be/JIlYroSsInU?t=750
 *
 *
 * Open http://localhost:3000/api/wrong in your browser
 * and check the console when you refresh the page.
 * Yo will see that the connection is established only once.
 *
 * See also: pages/api/right.ts
 *
 * Note: In the example we return { mongoClient } instead of
 *       (cachedClient = mongoClient) as it is here.
 *
 * Note: Actually, the exported function below will be called in the global scope
 *       (via right.ts) and the connection will be cached within its closure.
 */
import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
const options = {};

if (!uri) {
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env.local"
  );
}

let cachedClient: MongoClient; // This is gonna be our cached connection

export async function connectToDatabase() {
  try {
    if (cachedClient) {
      return cachedClient;
    }

    const mongoClient = await new MongoClient(String(uri), options).connect();
    console.log("Just connected to MongoDB!");

    return (cachedClient = mongoClient);
  } catch (error) {
    console.error(error);
  }
}
