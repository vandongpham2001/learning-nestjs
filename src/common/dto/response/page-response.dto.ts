import { ApiProperty } from '@nestjs/swagger';

export class PageResponse<T> {
  @ApiProperty({ isArray: true })
  list: T[];

  @ApiProperty()
  total: number;

  @ApiProperty()
  page: number;

  @ApiProperty()
  limit: number;

  @ApiProperty()
  lastPage: number;

  constructor({
    list,
    total,
    page,
    limit,
  }: {
    list: T[];
    total: number;
    page: number;
    limit: number;
  }) {
    this.list = list;
    this.total = total;
    this.page = page;
    this.limit = limit;
    this.lastPage = Math.ceil(total / limit);
  }
}
