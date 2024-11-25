import { IsNotEmpty, IsNumber, IsOptional, IsString, Min, Max } from "class-validator";

export class CreateTodoItemDto {
  @IsNotEmpty()
  @IsString()
  readonly title: string;

  @IsOptional()
  @IsString()
  readonly description: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(5)
  readonly priority: number;

  @IsNotEmpty()
  @IsString()
  readonly todoListId: string
}
