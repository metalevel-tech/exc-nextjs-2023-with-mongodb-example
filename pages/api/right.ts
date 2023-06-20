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
 * See also: lib/connectToDatabase.ts
 *
 * Note: In the example we assign 'const { mongoClient } = await connectToDatabase();'
 *       but here we have 'const mongoClient = await connectToDatabase();' this is because
 *       we return (cachedClient = mongoClient) from lib/connectToDatabase.ts...
 */
import { NextApiRequest, NextApiResponse } from "next";

import { connectToDatabase } from "../../lib/connectToDatabase";

const dbName = "sample_training";
const collectionName = "companies";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const mongoClient = await connectToDatabase();

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
