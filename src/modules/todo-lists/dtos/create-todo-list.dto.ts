import { IsNotEmpty } from 'class-validator';

export class CreateTodoListDto {
  @IsNotEmpty()
  readonly title: string;
}
