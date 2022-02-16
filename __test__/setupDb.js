import { MongoClient } from "mongodb";

let cachedConnection = null;
let cachedDb = null;

export async function connect() {
  if (cachedConnection && cachedDb) {
    return {
      connection: cachedConnection,
      db: cachedDb,
    };
  }

  const connection = await MongoClient.connect(global.__MONGO_URI__, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  const db = await connection.db();

  cachedConnection = connection;
  cachedDb = db;

  return {
    connection: cachedConnection,
    db: cachedDb,
  };
}

export async function disconnect() {
  cachedConnection.close();
}
