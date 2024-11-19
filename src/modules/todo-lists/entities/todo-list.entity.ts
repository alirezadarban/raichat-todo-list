import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    OneToMany,
  } from 'typeorm';
  import { User } from '../../users/entities/user.entity';
  import { TodoItem } from '../../todo-items/entities/todo-item.entity';
  
  @Entity()
  export class TodoList {
    @PrimaryGeneratedColumn()
    id: number;
  
    @ManyToOne(() => User, (user) => user.todoLists, { onDelete: 'CASCADE' })
    user: User;
  
    @Column()
    title: string;
  
    @OneToMany(() => TodoItem, (todoItem) => todoItem.todoList, { cascade: true })
    todoItems: TodoItem[];
  }
  