/**
 * This is a correct way to connect to MongoDB Atlas,
 * because the client is cached between requests.
 *
 * Here we are using JS module, provided by Next.js template.
 * For more information: https://youtu.be/JIlYroSsInU?t=923
 *
 * Open http://localhost:3000/api/wrong in your browser
 * and check the console when you refresh the page.
 * Yo will see that the connection is established only once.
 *
 * See also: lib/mongodb.ts
 */
import { NextApiRequest, NextApiResponse } from "next";

import clientPromise from "../../lib/mongodb";

const dbName = "sample_training";
const collectionName = "companies";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const mongoClient = await clientPromise;

    if (!mongoClient) {
      throw new Error("MongoClient is not defined!");
    }

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
