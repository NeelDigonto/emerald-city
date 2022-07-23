import { MongoClient } from 'mongodb';

const uri = `mongodb+srv://${process.env.MONGO_USER_NAME}:${process.env.MONGO_USER_PASSWORD}@cluster0.bavoa.mongodb.net/?retryWrites=true&w=majority`;

export async function getMongoClient() {
  const client = new MongoClient(uri, {});

  return client;
}

export async function getMongoConnection() {
  const client = new MongoClient(uri);

  return client.connect();
}
