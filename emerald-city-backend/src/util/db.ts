import { MongoClient, ServerApiVersion } from 'mongodb';

const getMongoUri = () => {
  return `mongodb+srv://${process.env.MONGO_USER_NAME}:${process.env.MONGO_USER_PASSWORD}@cluster0.bavoa.mongodb.net/?retryWrites=true&w=majority`;
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
