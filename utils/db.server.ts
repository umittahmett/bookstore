import { MongoClient, BSON, GridFSBucket, Db } from "mongodb";

let connectionString = process.env.CONNECTION_STRING || "";

if (!connectionString) {
  throw new Error("No connection string provided. \n\nPlease create a `.env` file in the root of this project. Add a CONNECTION_STRING variable to that file with the connection string to your MongoDB cluster. \nRefer to the README.md file for more information.");
}

if (connectionString.indexOf("appName") === -1) {
  connectionString += connectionString.indexOf("?") > -1 
    ? "&appName=devrel.template.remix|" 
    : "?appName=devrel.template.remix|";
} else {
  connectionString = connectionString.replace(
    /appName\=([a-z0-9]*)/i, 
    (m, p) => `appName=devrel.template.remix|${p}`
  );
}

let mongodb: MongoClient;
let db: Db;
let gfsBucket: GridFSBucket;

declare global {
  var __db: MongoClient | undefined;
}

async function connectToDatabase(): Promise<{ db: Db; gfsBucket: GridFSBucket }> {
  if (!mongodb) {
    mongodb = process.env.NODE_ENV === "production"
      ? new MongoClient(connectionString, {
          connectTimeoutMS: 30000,
          socketTimeoutMS: 45000,
        })
      : global.__db || new MongoClient(connectionString);

    if (process.env.NODE_ENV !== "production") {
      global.__db = mongodb;
    }
  }

  try {
    await mongodb.connect();
    console.log("Connected to MongoDB");
    db = mongodb.db("bookstore");
    gfsBucket = new GridFSBucket(db, {
      bucketName: 'uploads',
    });
    return { db, gfsBucket };
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
    throw error;
  }
}

process.on('SIGINT', async () => {
  try {
    await mongodb.close();
    console.log('MongoDB connection closed');
    process.exit(0);
  } catch (err) {
    console.error('Error closing MongoDB connection:', err);
    process.exit(1);
  }
});

let ObjectId = BSON.ObjectId;

export {
  connectToDatabase,
  ObjectId,
};