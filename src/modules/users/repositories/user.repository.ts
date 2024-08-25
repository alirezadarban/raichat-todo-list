import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../schemas/user.schema';
import { SignupDto } from '../dtos/signup.dto';

@Injectable()
export class UserRepository {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(SignupDto: SignupDto): Promise<User> {
    const createdUser = new this.userModel(SignupDto);
    return createdUser.save();
  }

  async findByUsername(username: string): Promise<User> {
    return this.userModel.findOne({ username }).exec();
  }

  async findById(id: string): Promise<User> {
    return this.userModel.findById(id).exec();
  }
}