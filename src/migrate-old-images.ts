import mongoose from 'mongoose';
import { v2 as cloudinary } from 'cloudinary';
import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config({ path: path.join(__dirname, '..', '.env') });

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || 'bu0i3ymy',
  api_key: process.env.CLOUDINARY_API_KEY || '283712387544545',
  api_secret: process.env.CLOUDINARY_API_SECRET || 'lZo__F5uIWXnt7I5x_THCX2CRw8',
});

const uri = process.env.MONGODB_URI || process.env.MONGO_URI || 'mongodb://rs5045280:xbpneTRReMJD9LAc@ac-qpd9k1n-shard-00-00.sbbouj5.mongodb.net:27017,ac-qpd9k1n-shard-00-01.sbbouj5.mongodb.net:27017,ac-qpd9k1n-shard-00-02.sbbouj5.mongodb.net:27017/parsh_yoga_backend?ssl=true&replicaSet=atlas-45jbz5-shard-0&authSource=admin&retryWrites=true&w=majority';

async function migrate() {
  console.log('Connecting to MongoDB via Mongoose...');
  const conn = await mongoose.connect(uri);
  console.log('Connected! Fetching products...');

  const db = conn.connection.db;
  if (!db) {
    console.error('Database connection failed');
    return;
  }

  const collection = db.collection('products');
  const products = await collection.find({}).toArray();
  console.log(`Found ${products.length} products to check...`);

  let count = 0;

  for (let i = 0; i < products.length; i++) {
    const p = products[i];
    let updated = false;
    const updateDoc: any = {};

    console.log(`[${i + 1}/${products.length}] "${p.title || p._id}"...`);

    // 1. Check Main Image
    if (p.image && typeof p.image === 'string' && p.image.startsWith('data:')) {
      console.log(`  → Uploading main image...`);
      try {
        const res = await cloudinary.uploader.upload(p.image, { folder: 'products', resource_type: 'auto' });
        updateDoc.image = res.secure_url;
        updateDoc.imagePublicId = res.public_id;
        updated = true;
      } catch (e: any) {
        console.error(`  ❌ Main image error:`, e.message);
      }
    }

    // 2. Check Thumbnails
    if (Array.isArray(p.thumbnails) && p.thumbnails.length > 0) {
      const newThumbs: string[] = [];
      const newPublicIds: string[] = [];
      let thumbUpdated = false;

      for (const thumb of p.thumbnails) {
        if (typeof thumb === 'string' && thumb.startsWith('data:')) {
          try {
            const res = await cloudinary.uploader.upload(thumb, { folder: 'products/thumbnails', resource_type: 'auto' });
            newThumbs.push(res.secure_url);
            newPublicIds.push(res.public_id);
            thumbUpdated = true;
          } catch (e: any) {
            console.error(`  ❌ Thumb error:`, e.message);
          }
        } else {
          newThumbs.push(thumb);
        }
      }

      if (thumbUpdated) {
        updateDoc.thumbnails = newThumbs;
        updateDoc.thumbnailPublicIds = newPublicIds;
        updated = true;
      }
    }

    // 3. Check Video
    if (p.video && typeof p.video === 'string' && p.video.startsWith('data:')) {
      console.log(`  → Uploading video...`);
      try {
        const res = await cloudinary.uploader.upload(p.video, { folder: 'products/videos', resource_type: 'auto' });
        updateDoc.video = res.secure_url;
        updateDoc.videoPublicId = res.public_id;
        updated = true;
      } catch (e: any) {
        console.error(`  ❌ Video error:`, e.message);
      }
    }

    if (updated) {
      await collection.updateOne({ _id: p._id }, { $set: updateDoc });
      count++;
      console.log(`  ✅ Product [${i + 1}/${products.length}] updated in MongoDB!`);
    }
  }

  console.log(`\n========================================`);
  console.log(`🎉 Migration complete! Updated ${count} products.`);
  console.log(`========================================\n`);

  await mongoose.disconnect();
}

migrate().catch(console.error);
