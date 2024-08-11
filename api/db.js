import { MongoClient, ServerApiVersion } from "mongodb";
import { MONGO_DATABASE, MONGO_PASSWORD, MONGO_USER } from "./config.js";

const uri = `mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}@cluster0.xk4dvlj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db(MONGO_DATABASE).command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } catch (err) {
    console.log(err.message);
  }
}
run().catch(console.dir);

export const db = client.db(MONGO_DATABASE);
