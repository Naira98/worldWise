import { MongoClient, ServerApiVersion } from "mongodb";
import { MONGO_DATABASE, MONGO_PASSWORD, MONGO_USER } from "./config.js";

const uri = `mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}@cluster0.xk4dvlj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    await client.connect();
    await client.db(MONGO_DATABASE).command({ ping: 1 });
  } catch (err) {
    console.log(err.message);
  }
}
run().catch(console.dir);

export const db = client.db(MONGO_DATABASE);
