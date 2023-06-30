import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type SurveyDocument = Survey & Document;

@Schema()
export class Survey {
  @Prop({ required: true })
  ownerId: string;

  @Prop()
  title: string;

  @Prop()
  componentList: {
    fe_id: string;
    type: string;
    title: string;
    props: { [key: string]: any };
  }[];

  @Prop()
  isPublished: boolean;

  @Prop()
  isDeleted: boolean;

  @Prop()
  desc: string;

  @Prop()
  js: string;

  @Prop()
  css: string;

  @Prop({ required: true, default: Date.now })
  createdAt: Date;

  @Prop({ required: true, default: Date.now })
  updatedAt: Date;
}

export const SurveySchema = SchemaFactory.createForClass(Survey);
