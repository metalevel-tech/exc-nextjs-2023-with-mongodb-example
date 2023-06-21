import { MongoClient, MongoClientOptions } from "mongodb";

if (!process.env.MONGODB_URI) {
  throw new Error('Invalid/Missing environment variable: "MONGODB_URI"');
}

/**
 * In the most tutorials Next.js + MongoDM + JavaScript
 * the options object looks like:
 *
 * const options = {
 *    useNewUrlParser: true,
 *    useUnifiedTopology: true,
 * }
 *
 * The both options are deprecated and no longer exist on
 * "MongoClientOptions" interface.
 *
 * Refs.:
 * > https://mongodb.github.io/node-mongodb-native/3.3/reference/unified-topology/
 * > https://mongoosejs.com/docs/5.x/docs/deprecations.html
 */
const uri = process.env.MONGODB_URI;
const options: MongoClientOptions = {};

let client;
let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === "development") {
  // In development mode, use a global variable so that the value
  // is preserved across module reloads caused by HMR (Hot Module Replacement).
  let globalWithMongo = global as typeof globalThis & {
    _mongoClientPromise?: Promise<MongoClient>;
  };

  if (!globalWithMongo._mongoClientPromise) {
    client = new MongoClient(uri, options);
    globalWithMongo._mongoClientPromise = client.connect();
  }

  clientPromise = globalWithMongo._mongoClientPromise;
} else {
  // In production mode, it's best to not use a global variable.
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

console.log("Module: Just connected to MongoDB!");

// Export a module-scoped MongoClient promise. By doing this in a
// separate module, the client can be shared across functions.
export default clientPromise;
