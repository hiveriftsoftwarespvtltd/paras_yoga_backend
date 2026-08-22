import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product, ProductDocument } from './schemas/product.schema';
import { CloudinaryService } from '../cloudinary/cloudinary.service';

@Injectable()
export class ProductsService {
  private readonly logger = new Logger(ProductsService.name);

  constructor(
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  private isBase64(str: string): boolean {
    return typeof str === 'string' && str.startsWith('data:');
  }

  private async processMediaPayload(productData: any, existingProduct?: ProductDocument) {
    // 1. Process Main Image
    if (productData.image && this.isBase64(productData.image)) {
      try {
        const uploaded = await this.cloudinaryService.uploadImage(productData.image, 'products');
        
        // Delete previous Cloudinary image if updating
        const oldPublicId = existingProduct?.imagePublicId || 
          (existingProduct?.image ? this.cloudinaryService.extractPublicId(existingProduct.image) : null);
        
        if (oldPublicId) {
          await this.cloudinaryService.deleteImage(oldPublicId);
        }

        productData.image = uploaded.secure_url;
        productData.imagePublicId = uploaded.public_id;
      } catch (err) {
        this.logger.error('Failed to upload main image to Cloudinary', err);
      }
    }

    // 2. Process Thumbnails
    if (Array.isArray(productData.thumbnails) && productData.thumbnails.length > 0) {
      const newThumbnails: string[] = [];
      const newPublicIds: string[] = [];

      for (const thumb of productData.thumbnails) {
        if (this.isBase64(thumb)) {
          try {
            const uploaded = await this.cloudinaryService.uploadImage(thumb, 'products/thumbnails');
            newThumbnails.push(uploaded.secure_url);
            newPublicIds.push(uploaded.public_id);
          } catch (err) {
            this.logger.error('Failed to upload thumbnail to Cloudinary', err);
          }
        } else if (typeof thumb === 'string') {
          newThumbnails.push(thumb);
          const extractedId = this.cloudinaryService.extractPublicId(thumb);
          if (extractedId) newPublicIds.push(extractedId);
        }
      }

      productData.thumbnails = newThumbnails;
      productData.thumbnailPublicIds = newPublicIds;
    }

    // 3. Process Video (Optional)
    if (productData.video && this.isBase64(productData.video)) {
      try {
        const uploaded = await this.cloudinaryService.uploadImage(productData.video, 'products/videos');

        const oldVideoId = existingProduct?.videoPublicId || 
          (existingProduct?.video ? this.cloudinaryService.extractPublicId(existingProduct.video) : null);
        if (oldVideoId) {
          await this.cloudinaryService.deleteImage(oldVideoId);
        }

        productData.video = uploaded.secure_url;
        productData.videoPublicId = uploaded.public_id;
      } catch (err) {
        this.logger.error('Failed to upload video to Cloudinary', err);
      }
    }
  }

  async findAll(category?: string): Promise<Product[]> {
    const query = category && category !== 'All' ? { category } : {};
    return this.productModel.find(query).sort({ createdAt: -1, _id: -1 }).exec();
  }

  async findOne(id: string): Promise<Product> {
    const product = await this.productModel.findById(id).exec();
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return product;
  }

  async create(productData: any): Promise<Product> {
    await this.processMediaPayload(productData);
    const createdProduct = new this.productModel(productData);
    return createdProduct.save();
  }

  async update(id: string, productData: any): Promise<Product> {
    const existingProduct = await this.productModel.findById(id).exec();
    if (!existingProduct) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }

    await this.processMediaPayload(productData, existingProduct);

    const updatedProduct = await this.productModel
      .findByIdAndUpdate(id, productData, { new: true })
      .exec();

    if (!updatedProduct) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }

    return updatedProduct;

  }

  async remove(id: string): Promise<any> {
    const product = await this.productModel.findById(id).exec();
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }

    // Delete assets from Cloudinary
    const imagePublicId = product.imagePublicId || this.cloudinaryService.extractPublicId(product.image);
    if (imagePublicId) {
      await this.cloudinaryService.deleteImage(imagePublicId);
    }

    if (Array.isArray(product.thumbnailPublicIds) && product.thumbnailPublicIds.length > 0) {
      for (const pid of product.thumbnailPublicIds) {
        await this.cloudinaryService.deleteImage(pid);
      }
    } else if (Array.isArray(product.thumbnails)) {
      for (const thumbUrl of product.thumbnails) {
        const pid = this.cloudinaryService.extractPublicId(thumbUrl);
        if (pid) await this.cloudinaryService.deleteImage(pid);
      }
    }

    const videoPublicId = product.videoPublicId || (product.video ? this.cloudinaryService.extractPublicId(product.video) : null);
    if (videoPublicId) {
      await this.cloudinaryService.deleteImage(videoPublicId);
    }

    return this.productModel.findByIdAndDelete(id).exec();
  }

  async toggleBestseller(id: string): Promise<Product> {
    const product = await this.findOne(id);
    product.bestSeller = !product.bestSeller;

    const doc = product as any;
    return doc.save();
  }
}
