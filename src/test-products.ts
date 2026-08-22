import { MongoClient } from 'mongodb';

const uri = 'mongodb://rs5045280:xbpneTRReMJD9LAc@ac-qpd9k1n-shard-00-00.sbbouj5.mongodb.net:27017,ac-qpd9k1n-shard-00-01.sbbouj5.mongodb.net:27017,ac-qpd9k1n-shard-00-02.sbbouj5.mongodb.net:27017/parsh_yoga_backend?ssl=true&replicaSet=atlas-45jbz5-shard-0&authSource=admin&retryWrites=true&w=majority';

async function testFetch() {
  const client = new MongoClient(uri);
  await client.connect();
  const db = client.db('parsh_yoga_backend');
  const collection = db.collection('products');

  const products = await collection.find({}).toArray();
  console.log(`Fetched ${products.length} products directly via MongoClient.`);
  
  let base64Count = 0;
  let totalLength = 0;

  products.forEach((p, idx) => {
    const json = JSON.stringify(p);
    totalLength += json.length;
    const isBase64 = p.image && typeof p.image === 'string' && p.image.startsWith('data:');
    if (isBase64) base64Count++;
    
    if (isBase64 || json.length > 50000) {
      console.log(`[${idx + 1}] ID: ${p._id} (${typeof p._id}) | Title: ${p.title} | Size: ${(json.length / 1024).toFixed(1)} KB | Base64Image: ${isBase64}`);
    }
  });

  console.log(`Summary: TotalSize = ${(totalLength / 1024 / 1024).toFixed(2)} MB | Base64Products = ${base64Count}`);
  await client.close();
}

testFetch().catch(console.error);
