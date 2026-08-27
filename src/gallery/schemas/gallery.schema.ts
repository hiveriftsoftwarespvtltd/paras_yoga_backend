import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type GalleryDocument = Gallery & Document;

@Schema({ timestamps: true })
export class Gallery {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true, default: 'ALL' })
  category: string;

  @Prop({ required: true })
  image: string;

  @Prop()
  location: string;

  @Prop()
  description: string;
}

export const GallerySchema = SchemaFactory.createForClass(Gallery);
