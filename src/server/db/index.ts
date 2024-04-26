declare global {
  namespace NodeJS {
    interface Global {
      mongo: {
        conn: MongoClient;
        promise: Promise<{ client: MongoClient; db: any }>;
      };
    }
  }
}

import { MongoClient } from 'mongodb';

let clientPromise: Promise<{ client: MongoClient; db: any }>;

async function connectToMongo(uri: string, options: any): Promise<{ client: MongoClient; db: any }> {
    const client = new MongoClient(uri, options);
    await client.connect();
    const db = client.db('proj'); 
    return { client, db };
}

if (!global.mongo || !global.mongo.promise) {
    const uri = process.env.MONGODB_URI;
    if (!uri) {
        throw new Error('Please define the MONGODB_URI environment variable');
    }
    const options = {
        useUnifiedTopology: true,
        useNewUrlParser: true,
    };
    clientPromise = connectToMongo(uri, options).then((connection) => {
        global.mongo = { conn: connection.client, promise: connection };
        return connection;
    });
} else {
    clientPromise = global.mongo.promise;
}

export default clientPromise;