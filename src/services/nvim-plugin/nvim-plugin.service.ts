import { Injectable, Logger } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { sendNvimDataDto } from 'src/controllers/nvim-plugin/dto/sendNvimData.dto';
import { User, UserDocument } from '../users/users.schema';
import { Connection, Model } from 'mongoose';
import { UsersService } from '../users/users.service';

@Injectable()
export class NvimPluginService {
  private readonly logger = new Logger(NvimPluginService.name);
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectConnection() private connection: Connection,
    private usersService: UsersService
  ){
    console.log('Database name:', this.connection.name);
    console.log('Nvim service successfully mapped to ', Object.keys(this.connection.collections), 'collection');
  }
  
  async sendNvimScoreData(sendNvimDataDto: sendNvimDataDto) {
    this.logger.log(`Request received: ${JSON.stringify(sendNvimDataDto)}`);
    const id_token = sendNvimDataDto.id_token;
  
    try {
      const user = await this.usersService.getUserDataFromToken(id_token)
      
      if (user) {
        this.logger.log(`User retrieved with token ${id_token}:\n${JSON.stringify(user, null, 2)}`);
        return {
          status: 'success',
          statusCode: 200,
          message: 'User data retrieved successfully',
          data: {
            user: {
              username: user.username,
              first_name: user.first_name,
              last_name: user.last_name,
              email: user.email,
              score: user.score,
              combo_duration_in_seconds: user.combo_duration_in_seconds,
              total_key_pressed: user.total_key_pressed
            }
          }
        };
      } else {
        return {
          status: 'fail',
          statusCode: 404,
          message: 'User not found',
          data: null
        };
      }
    } catch (error) {
      this.logger.error(`Error retrieving user data: ${error.message}`);
      return {
        status: 'error',
        statusCode: 500,
        message: 'An error occurred while processing your request',
        error: error.message
      };
    }
  }

}
