// src/users/users.service.ts
import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../schemas/user.schema';

@Injectable()
export class UsersService {
  logger: Logger;
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async createUser(createUserDto: Partial<User>): Promise<User> {
    const createdUser = new this.userModel(createUserDto);
    return createdUser.save();
  }

  async findUserByusername(username: string): Promise<User | null> {
    console.log("::::", username)
    const user = await this.userModel.findOne({ username }).exec();
    console.log("^^^" , user)
    this.userModel.persist
    return user;
  }
}