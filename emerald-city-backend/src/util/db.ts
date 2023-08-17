import { MongoClient, ServerApiVersion } from 'mongodb';
import { MONGO_URI } from '../Constants.js';

const getMongoUri = () => {
  return MONGO_URI;
};

export async function getMongoClient() {
  const client = new MongoClient(getMongoUri(), {
    serverApi: ServerApiVersion.v1,
  });

  return client;
}

export async function getMongoConnection() {
  const client = new MongoClient(getMongoUri(), {
    serverApi: ServerApiVersion.v1,
  });

  return client.connect();
}
