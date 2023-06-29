import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Survey, SurveyDocument } from '@/schema/survey.schema';

@Injectable()
export class SurveyService {
  constructor(
    @InjectModel(Survey.name) private surveyModel: Model<SurveyDocument>,
  ) {}

  async createSurvey(survey: Survey) {
    const newSurvey = new this.surveyModel(survey);
    return await newSurvey.save();
  }

  async getAllSurveys(ownerId: number, page: number, pageSize: number) {
    const list = await this.surveyModel
      .find({ ownerId })
      .skip((page - 1) * pageSize)
      .limit(pageSize)
      .exec();
    const total = await this.surveyModel.countDocuments({ ownerId }).exec();
    return { list, total };
  }

  async getSurveyById(id: string) {
    return await this.surveyModel.findById(id).exec();
  }

  async updateSurvey(id: string, survey: Survey) {
    return await this.surveyModel
      .findByIdAndUpdate(id, survey, { new: true })
      .exec();
  }

  async deleteSurvey(id: string) {
    return await this.surveyModel.findByIdAndDelete(id).exec();
  }
}
