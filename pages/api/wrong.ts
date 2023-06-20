/**
 * This is a wrong way to connect to MongoDB Atlas,
 * because the client is not cached between requests.
 * For more information: https://youtu.be/JIlYroSsInU?t=543
 *
 * Open http://localhost:3000/api/wrong in your browser
 * and check the console when you refresh the page.
 * Yo will see that the connection is established at every request.
 */
import { MongoClient } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";

const uri = process.env.MONGODB_URI;
const options = {};
const dbName = "sample_training";
const collectionName = "companies";

if (!uri) {
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env.local"
  );
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const mongoClient = await new MongoClient(String(uri), options).connect();
    console.log("Just connected to MongoDB!");

    const db = mongoClient.db(dbName);
    const collection = db.collection(collectionName);

    const results = await collection
      .find({})
      .project({ name: 1 })
      .limit(5)
      .toArray();

    res.status(200).json({ HTTP_METHOD: req.method, RESULTS: results });
  } catch (error) {
    console.log("error", error);
  }
}
