import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ _id: false })
class Highlight {
  @Prop({ required: true })
  label: string;

  @Prop({ required: true })
  icon: string;
}

@Schema({ _id: false })
class Specs {
  @Prop()
  category: string;

  @Prop()
  usage: string;

  @Prop()
  material: string;

  @Prop()
  coating: string;

  @Prop()
  installation: string;

  @Prop()
  warranty: string;
}

@Schema({ _id: false })
class MuscleGroup {
  @Prop()
  primary: string;

  @Prop()
  secondary: string;

  @Prop()
  focusArea: string;
}

@Schema({ _id: false })
class TechSpecs {
  @Prop()
  modelName: string;

  @Prop()
  productCode: string;

  @Prop()
  material: string;

  @Prop()
  pipeThickness: string;

  @Prop()
  finish: string;

  @Prop()
  weatherResistance: string;

  @Prop()
  mountingType: string;

  @Prop()
  userCapacity: string;

  @Prop()
  ageGroup: string;

  @Prop()
  dimension: string;

  @Prop()
  safePlayArea: string;

  @Prop()
  netWeight: string;

  @Prop()
  maxUserWeight: string;

  @Prop()
  certification: string;
}

export type ProductDocument = Product & Document;

@Schema({
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (doc, ret: any) => {
      ret.id = ret._id.toString();
      delete ret._id;
      delete ret.__v;
      return ret;
    }
  }
})
export class Product {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  category: string;

  @Prop()
  categoryLabel: string;

  @Prop()
  type: string;

  @Prop()
  material: string;

  @Prop({ required: false, type: Number })
  price?: number;

  @Prop()
  suitability: string;

  @Prop({ required: true })
  image: string; // Base64 data URL or asset URL

  @Prop()
  imagePublicId?: string;

  @Prop()
  video: string; // Base64 data URL or external video link

  @Prop()
  videoPublicId?: string;

  @Prop()
  desc: string;

  @Prop({ default: false })
  bestSeller: boolean;

  @Prop({ default: true })
  heavyDuty: boolean;

  @Prop()
  longDesc: string;

  @Prop({ type: [Highlight], default: [] })
  highlights: Highlight[];

  @Prop({ type: Specs })
  specs: Specs;

  @Prop({ type: [String], default: [] })
  thumbnails: string[];

  @Prop({ type: [String], default: [] })
  thumbnailPublicIds?: string[];


  @Prop({ type: [String], default: [] })
  overviewBullets: string[];

  @Prop({ type: MuscleGroup })
  muscleGroup: MuscleGroup;

  @Prop({ type: TechSpecs })
  techSpecs: TechSpecs;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
