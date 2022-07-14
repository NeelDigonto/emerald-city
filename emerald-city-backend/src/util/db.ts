import { MongoClient } from 'mongodb';

const uri = `mongodb+srv://notfathomless:TheViper46@cluster0.bavoa.mongodb.net/?retryWrites=true&w=majority`;

export async function getMongoClient() {
  const client = new MongoClient(uri, { authMechanismProperties: {} });

  return client;
}

export async function getMongoConnection() {
  const client = new MongoClient(uri);

  return client.connect();
}
