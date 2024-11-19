import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToMany,
    JoinTable,
  } from 'typeorm';
  import { TodoList } from '../../todo-lists/entities/todo-list.entity';
  
  @Entity()
  export class User {
    @PrimaryGeneratedColumn('uuid')
    id: number;
  
    @Column({ unique: true })
    username: string;
  
    @Column()
    password: string;
  
    @ManyToMany(() => TodoList, (todoList) => todoList.user, { cascade: true })
    @JoinTable()
    todoLists: TodoList[];
  }
  