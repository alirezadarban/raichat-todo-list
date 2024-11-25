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
    id: string;
  
    @Column({ unique: true })
    username: string;
  
    @Column()
    password: string;
  
    @JoinTable()
    @ManyToMany(
      type => TodoList, 
      (todoList) => todoList.user, 
      { cascade: true })
    todoLists: TodoList[];
  }
  