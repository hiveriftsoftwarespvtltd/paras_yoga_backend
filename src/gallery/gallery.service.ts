import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Gallery, GalleryDocument } from './schemas/gallery.schema';

@Injectable()
export class GalleryService {
  constructor(
    @InjectModel(Gallery.name) private galleryModel: Model<GalleryDocument>,
  ) {}

  async findAll(category?: string): Promise<Gallery[]> {
    if (category && category !== 'ALL') {
      return this.galleryModel.find({ category }).sort({ createdAt: -1 }).exec();
    }
    return this.galleryModel.find().sort({ createdAt: -1 }).exec();
  }

  async findOne(id: string): Promise<Gallery> {
    const item = await this.galleryModel.findById(id).exec();
    if (!item) {
      throw new NotFoundException('Gallery item not found');
    }
    return item;
  }

  async create(data: any): Promise<Gallery> {
    const newItem = new this.galleryModel(data);
    return newItem.save();
  }

  async update(id: string, data: any): Promise<Gallery> {
    const updated = await this.galleryModel.findByIdAndUpdate(id, data, { new: true }).exec();
    if (!updated) {
      throw new NotFoundException('Gallery item not found');
    }
    return updated;
  }

  async remove(id: string): Promise<any> {
    const deleted = await this.galleryModel.findByIdAndDelete(id).exec();
    if (!deleted) {
      throw new NotFoundException('Gallery item not found');
    }
    return { message: 'Gallery item deleted successfully' };
  }
}
