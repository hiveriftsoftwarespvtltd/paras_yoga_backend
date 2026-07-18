import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Sector, SectorDocument } from './schemas/sector.schema';

@Injectable()
export class SectorsService {
  constructor(
    @InjectModel(Sector.name) private sectorModel: Model<SectorDocument>,
  ) {}

  async findAll(): Promise<Sector[]> {
    return this.sectorModel.find().sort({ createdAt: -1 }).exec();
  }

  async findOne(id: number): Promise<Sector> {
    const sector = await this.sectorModel.findOne({ id }).exec();
    if (!sector) {
      throw new NotFoundException(`Sector with ID ${id} not found`);
    }
    return sector;
  }

  async update(id: number, sectorData: any): Promise<Sector> {
    const updatedSector = await this.sectorModel
      .findOneAndUpdate({ id }, sectorData, { new: true })
      .exec();
    if (!updatedSector) {
      throw new NotFoundException(`Sector with ID ${id} not found`);
    }
    return updatedSector;
  }

  async create(sectorData: any): Promise<Sector> {
    if (!sectorData.id) {
      const highestSector = await this.sectorModel.findOne().sort('-id').exec();
      sectorData.id = highestSector ? highestSector.id + 1 : 1;
    }
    const createdSector = new this.sectorModel(sectorData);
    return createdSector.save();
  }

  async remove(id: number): Promise<any> {
    const result = await this.sectorModel.findOneAndDelete({ id }).exec();
    if (!result) {
      throw new NotFoundException(`Sector with ID ${id} not found`);
    }
    return result;
  }
}
