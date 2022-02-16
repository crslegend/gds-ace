import { MongoClient } from "mongodb";
import { connect } from "../__test__/setupDB";

let cachedClient = null;
let cachedDb = null;

const testEnv = process.env.NODE_ENV === "test";

export async function connectToDatabase() {
  if (testEnv) {
    const dbObj = connect();
    return dbObj;
  } else {
    const MONGODB_URI = process.env.MONGODB_URI;
    const MONGODB_DB = process.env.DB_NAME;

    // check the MongoDB URI
    if (!MONGODB_URI) {
      throw new Error("Define the MONGODB_URI environmental variable");
    }

    // check the MongoDB DB
    if (!MONGODB_DB) {
      throw new Error("Define the MONGODB_DB environmental variable");
    }

    // check the cached.
    if (cachedClient && cachedDb) {
      // load from cache
      return {
        client: cachedClient,
        db: cachedDb,
      };
    }

    // set the connection options
    const options = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    };

    // Connect to cluster
    let client = new MongoClient(MONGODB_URI, options);
    await client.connect();
    let db = client.db(MONGODB_DB);

    // set cache
    cachedClient = client;
    cachedDb = db;

    return {
      client: cachedClient,
      db: cachedDb,
    };
  }
}
