import { Injectable } from '@nestjs/common';
import { CreateAnswer, CreateAnswerDocument } from '@/schema/answer.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class AnswerService {
  constructor(
    @InjectModel(CreateAnswer.name)
    private readonly createAnswerModel: Model<CreateAnswerDocument>,
  ) {}

  // 创建一个新的答案
  async create(createAnswerDto: CreateAnswer): Promise<CreateAnswer> {
    const createdAnswer = new this.createAnswerModel(createAnswerDto);
    return createdAnswer.save();
  }

  // 通过id查找答案
  async findById(id: string): Promise<CreateAnswer> {
    return this.createAnswerModel.findById(id).exec();
  }

  // 查找所有答案
  async findAll(userId: string): Promise<CreateAnswer[]> {
    return this.createAnswerModel
      .find({
        ownerId: userId,
      })
      .exec();
  }

  // 通过id更新答案
  async update(
    id: string,
    updateAnswerDto: Partial<CreateAnswer>,
  ): Promise<CreateAnswer> {
    return this.createAnswerModel
      .findByIdAndUpdate(id, updateAnswerDto, { new: true })
      .exec();
  }

  // 通过id删除答案
  async delete(id: string): Promise<CreateAnswer> {
    return this.createAnswerModel.findByIdAndRemove(id).exec();
  }

  // 根据componentId查找答案
  async findAnswersByComponentId(componentId: string) {
    return this.createAnswerModel
      .find({ 'answerList.componentId': componentId })
      .exec();
  }
}
