import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type AnswerDocument = Answer & Document;

@Schema()
export class Answer {
  @Prop({ required: true })
  componentId: string;

  @Prop()
  value: string;
}

export const AnswerSchema = SchemaFactory.createForClass(Answer);

export type CreateAnswerDocument = CreateAnswer & Document;

@Schema()
export class CreateAnswer {
  @Prop({ required: true })
  questionId: string;

  @Prop([AnswerSchema])
  answerList: Answer[];

  @Prop({ required: true, default: Date.now })
  createdAt: Date;

  @Prop({ required: true, default: Date.now })
  updatedAt: Date;

  @Prop({ required: true })
  ownerId: string;
}

export const CreateAnswerSchema = SchemaFactory.createForClass(CreateAnswer);
