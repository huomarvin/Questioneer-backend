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
  questions: {
    questionText: string;
    questionType: string;
    choices: string[];
  }[];

  @Prop({ required: true, default: Date.now })
  createdAt: Date;

  @Prop({ required: true, default: Date.now })
  updatedAt: Date;
}

export const SurveySchema = SchemaFactory.createForClass(Survey);
