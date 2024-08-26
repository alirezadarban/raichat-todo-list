import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateTodoItemDto {
  @IsNotEmpty()
  @IsString()
  readonly title: string;

  @IsOptional()
  @IsString()
  readonly description: string;

  @IsOptional()
  @IsNumber()
  readonly priority: number;

  @IsNotEmpty()
  @IsString()
  readonly todoListId: string
}
