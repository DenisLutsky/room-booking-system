import { Type } from 'class-transformer';
import { IsInt, IsPositive, Max, Min } from 'class-validator';

import { Pagination } from 'shared/interfaces';

export class PaginationDto implements Pagination {
  @Min(1)
  @IsPositive()
  @IsInt()
  @Type(() => Number)
  public readonly page: number = 1;

  @Min(1)
  @Max(50)
  @IsPositive()
  @IsInt()
  @Type(() => Number)
  public readonly limit: number = 10;
}
