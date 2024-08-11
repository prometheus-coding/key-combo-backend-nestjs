import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';
import { User, UserDocument } from './users.schema';
import { CreateUserDto } from 'src/controllers/users/dto/create-user.dto';
import * as crypto from 'crypto';
import { UpdateUserDto } from 'src/controllers/users/dto/update-user.dto';

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

  async updateUserScore(updateUserScoreDto: UpdateUserDto): Promise<User | null> {
    const id_token = updateUserScoreDto.id_token
    const user = await this.userModel.findOne({ id_token }).exec();
    if (!user) {
      return null;
    }

    user.score = updateUserScoreDto.score;
    user.combo_duration_in_seconds = updateUserScoreDto.combo_duration_in_seconds;
    user.total_key_pressed = updateUserScoreDto.total_key_pressed;

    return user.save();
  }

  
  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async getUserDataFromToken(id_token: string): Promise<User | null>{
    const idObg = new Object({
      "id_token": id_token
    })
    try {
      const user = await this.userModel.findOne(idObg).exec()
      if(user){
        return user
      } else {
        return null
      }
    } catch (error) {
      console.error('Error retrieving user:', error)
      return null
    }
  }

  // Add other methods as needed
}
