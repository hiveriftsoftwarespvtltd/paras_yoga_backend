import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ProductsService } from './products/products.service';

async function bootstrap() {
  console.log('Testing Mongoose ProductsService.findAll()...');
  const app = await NestFactory.createApplicationContext(AppModule);
  const productsService = app.get(ProductsService);

  try {
    const products = await productsService.findAll();
    console.log(`SUCCESS! Found ${products.length} products using ProductsService.`);
  } catch (err: any) {
    console.error('ERROR in ProductsService.findAll():', err);
  }

  await app.close();
}

bootstrap().catch(console.error);
