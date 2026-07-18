import { MongoClient } from 'mongodb';
import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config({ path: path.join(__dirname, '..', '.env') });

const uri = process.env.MONGODB_URI || 'mongodb://rs5045280:xbpneTRReMJD9LAc@ac-qpd9k1n-shard-00-00.sbbouj5.mongodb.net:27017,ac-qpd9k1n-shard-00-01.sbbouj5.mongodb.net:27017,ac-qpd9k1n-shard-00-02.sbbouj5.mongodb.net:27017/parsh_yoga_backend?ssl=true&replicaSet=atlas-45jbz5-shard-0&authSource=admin&retryWrites=true&w=majority';

async function run() {
  console.log('Connecting to MongoDB Atlas...');
  const client = new MongoClient(uri);
  await client.connect();
  console.log('Connected. Fetching database list...');
  
  const adminDb = client.db().admin();
  const dbList = await adminDb.listDatabases();
  
  console.log('\n--- DATABASES ON THIS CLUSTER ---');
  let totalCollections = 0;
  for (const dbInfo of dbList.databases) {
    const db = client.db(dbInfo.name);
    try {
      const collections = await db.listCollections().toArray();
      const sizeMb = dbInfo.sizeOnDisk ? (dbInfo.sizeOnDisk / 1024 / 1024).toFixed(2) : '0.00';
      console.log(`Database: "${dbInfo.name}" | Collections: ${collections.length} | Size: ${sizeMb} MB`);
      totalCollections += collections.length;
    } catch (e) {
      console.log(`Database: "${dbInfo.name}" | Failed to list collections: ${e.message}`);
    }
  }
  console.log(`\nTotal collections across all databases: ${totalCollections}`);
  
  await client.close();
}

run().catch(console.error);
