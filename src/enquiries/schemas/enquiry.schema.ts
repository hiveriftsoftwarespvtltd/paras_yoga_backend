import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type EnquiryDocument = Enquiry & Document;

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
export class Enquiry {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  phone: string;

  @Prop()
  subject: string;

  @Prop()
  product: string;

  @Prop()
  message: string;

  @Prop({ default: 'New' })
  status: string; // 'New', 'Contacted', 'Completed'

  @Prop({ default: () => new Date().toISOString().split('T')[0] })
  date: string; // YYYY-MM-DD
}

export const EnquirySchema = SchemaFactory.createForClass(Enquiry);
