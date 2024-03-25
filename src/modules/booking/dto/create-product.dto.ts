import { IsInt, Min } from 'class-validator';

export class CreateProductDto {
  @Min(100)
  @IsInt()
  public readonly price!: number;
}
