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

if (process.env.NODE_ENV === "production") {
  mongodb = new MongoClient(connectionString, {
    connectTimeoutMS: 30000,
    socketTimeoutMS: 45000,
  });
} else {
  if (!global.__db) {
    global.__db = new MongoClient(connectionString);
  }
  mongodb = global.__db;
}

mongodb.connect().then(() => {
  db = mongodb.db("bookstore");  
  gfsBucket = new GridFSBucket(db, {
    bucketName: 'uploads',
  });
});

let ObjectId = BSON.ObjectId;

export {
  mongodb,
  db,       
  ObjectId,
  gfsBucket,
};
