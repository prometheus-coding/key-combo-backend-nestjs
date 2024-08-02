import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';
import { User, UserDocument } from './users.schema';
import { CreateUserDto } from 'src/controllers/users/dto/create-user.dto';
import * as crypto from 'crypto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectConnection() private connection: Connection
  ) {
    console.log('Database name:', this.connection.name);
    console.log('User service successfully mapped to ', Object.keys(this.connection.collections), 'collection');
  }

  private generateRandomToken(): string {
    return crypto.randomBytes(32).toString('hex');
  }
  async create(createUserDto: CreateUserDto): Promise<User> {
    const createdUser = new this.userModel({
      ...createUserDto,
      id_token: this.generateRandomToken()
    });
    return createdUser.save();
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  // Add other methods as needed
}
