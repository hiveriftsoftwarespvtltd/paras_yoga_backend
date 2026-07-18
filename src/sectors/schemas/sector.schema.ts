import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type SectorDocument = Sector & Document;

@Schema({ timestamps: true })
export class Sector {
  @Prop({ required: true, unique: true, type: Number })
  id: number; // numeric id for ordering and routing matching (1 to 6)

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  image: string; // Base64 data URL or asset path

  @Prop({ default: false })
  isOrange: boolean;

  @Prop({ required: true })
  iconName: string;
}

export const SectorSchema = SchemaFactory.createForClass(Sector);
