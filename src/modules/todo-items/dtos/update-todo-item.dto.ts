import { PartialType} from "@nestjs/mapped-types";
import { CreateTodoItemDto } from './create-todo-item.dto';

export class UpdateTodoItemDto extends PartialType(CreateTodoItemDto) {
  readonly todoListId?: never;
}
