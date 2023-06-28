import { Injectable, PipeTransform } from '@nestjs/common';
import { PaginationDto } from '@/common/common.dto';

@Injectable()
export class PagePipe implements PipeTransform {
  transform(value: PaginationDto) {
    value.currentPage = Number(value.currentPage);
    value.pageSize = Number(value.pageSize);
    return value;
  }
}
