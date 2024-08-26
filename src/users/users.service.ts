import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';
import { ScoreInfo, User, UserDocument,  } from './users.schema';
import * as crypto from 'crypto';
import { UpdateUserScoreDto } from './dto/update-user-score.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user-dto';

// export interface ScoreInfo {
//   score: number;
//   combo_duration_in_seconds: number;
//   total_key_pressed: number;
//   achieved_at: Date;
// }

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

  async updateUserScore(updateUserScoreDto: UpdateUserScoreDto): Promise<{
    status: string;
    statusCode: number;
    message: string;
    data?: {
      user: {
        username: string;
        scores: ScoreInfo
      };
    };
    error?: string;
  }> {
    const id_token = updateUserScoreDto.id_token;
    
    try {
      const user = await this.userModel.findOne({ id_token }).exec();
      
      if (!user) {
        return {
          status: 'fail',
          statusCode: 404,
          message: 'User not found',
          error: 'No user found with the provided id_token'
        };
      }
  
      // Update user score data
      const newScore:ScoreInfo = {
        score: updateUserScoreDto.score,
        combo_duration_in_seconds: updateUserScoreDto.combo_duration_in_seconds,
        total_key_pressed: updateUserScoreDto.total_key_pressed,
        achieved_at: updateUserScoreDto.score_updated_at
      }
      user.scores.push(newScore)
  
      const updatedUser = await user.save();
  
      return {
        status: 'success',
        statusCode: 200,
        message: 'User score updated successfully',
        data: {
          user: {
            username: updatedUser.username,
            scores: newScore
          }
        }
      };
    } catch (error) {
      return {
        status: 'error',
        statusCode: 500,
        message: 'An error occurred while updating the user score',
        error: error.message
      };
    }
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

  async updateById (id: string, updateUserDto: UpdateUserDto) : Promise<User>  {
    const updatedUser = await this.userModel.findByIdAndUpdate(
      id,
      updateUserDto,
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      throw new NotFoundException(`User with ID "${id}" not found`);
    }

    return updatedUser;
  }

  async findByEmail(email:string): Promise<User | null >{
    return this.userModel.findOne({email}).exec()
  }

}
