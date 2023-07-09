import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AnswerService } from './answer.service';
import { CreateAnswerDto } from './dto/create-answer.dto';
import { CreateAnswer } from '@/schema/answer.schema';
import { JwtGuard } from '@/guards/jwt.guard';

@Controller('answer')
export class AnswerController {
  constructor(private readonly answerService: AnswerService) {}

  @Post()
  create(@Body() createAnswerDto: CreateAnswerDto) {
    return this.answerService.create(createAnswerDto as CreateAnswer);
  }

  @Get()
  @UseGuards(JwtGuard)
  findAll(@Req() req) {
    const userId = req.user.userId;
    return this.answerService.findAll(userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.answerService.findById(id);
  }
}
