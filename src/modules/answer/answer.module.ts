import { Module } from '@nestjs/common';
import { AnswerService } from './answer.service';
import { AnswerController } from './answer.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { CreateAnswer, CreateAnswerSchema } from '@/schema/answer.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: CreateAnswer.name, schema: CreateAnswerSchema },
    ]),
  ],
  controllers: [AnswerController],
  providers: [AnswerService],
})
export class AnswerModule {}
