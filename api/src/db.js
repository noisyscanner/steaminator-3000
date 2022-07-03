import { MongoClient } from "mongodb";

const uri = "mongodb://BRAD-PC:27017/?maxPoolSize=20&w=majority";
const client = new MongoClient(uri);

export async function connect() {
  await client.connect();
  return client;
}
