import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
  } from 'typeorm';
  import { TodoList } from '../../todo-lists/entities/todo-list.entity';
  
  @Entity()
  export class TodoItem {
    @PrimaryGeneratedColumn('uuid')
    id: string;
  
    @ManyToOne(() => TodoList, (todoList) => todoList.todoItems, { onDelete: 'CASCADE' })
    todoList: TodoList;
  
    @Column()
    title: string;
  
    @Column({ nullable: true })
    description: string;
  
    @Column({ default: 0, type: 'int', unsigned: true })
    priority: number;
  }
  