import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CategoryDocument = Category & Document;

@Schema({ timestamps: true })
export class Category {
  @Prop({ required: true, unique: true })
  id: string; // The URL slug id (e.g. 'outdoor-gym')

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  iconName: string;
}

export const CategorySchema = SchemaFactory.createForClass(Category);
