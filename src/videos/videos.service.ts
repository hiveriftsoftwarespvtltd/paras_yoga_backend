import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Video, VideoDocument } from './schemas/video.schema';

@Injectable()
export class VideosService {
  constructor(
    @InjectModel(Video.name) private videoModel: Model<VideoDocument>,
  ) {}

  async findAll(): Promise<Video[]> {
    return this.videoModel.find().sort({ order: 1, createdAt: -1 }).exec();
  }

  async findOne(id: string): Promise<Video> {
    const video = await this.videoModel.findOne({ id }).exec();
    if (!video) {
      throw new NotFoundException(`Video with ID ${id} not found`);
    }
    return video;
  }

  async create(videoData: any): Promise<Video> {
    const count = await this.videoModel.countDocuments();
    if (!videoData.id) {
      videoData.id = `vid-${Date.now()}`;
    }
    if (videoData.order === undefined) {
      videoData.order = count + 1;
    }
    const createdVideo = new this.videoModel(videoData);
    return createdVideo.save();
  }

  async update(id: string, videoData: any): Promise<Video> {
    const updatedVideo = await this.videoModel
      .findOneAndUpdate({ id }, videoData, { new: true })
      .exec();
    if (!updatedVideo) {
      throw new NotFoundException(`Video with ID ${id} not found`);
    }
    return updatedVideo;
  }

  async remove(id: string): Promise<any> {
    const result = await this.videoModel.findOneAndDelete({ id }).exec();
    if (!result) {
      throw new NotFoundException(`Video with ID ${id} not found`);
    }
    return result;
  }
}
