import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { CreateNvimPluginDto } from 'src/controllers/nvim-plugin/dto/create-nvim-plugin.dto';
import { User, UserDocument } from '../users/users.schema';
import { Connection, Model } from 'mongoose';

@Injectable()
export class NvimPluginService {

  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectConnection() private connection: Connection
  ){
    console.log('Database name:', this.connection.name);
    console.log('Nvim service successfully mapped to ', Object.keys(this.connection.collections), 'collection');
  }

  getNvimData(createNvimPluginDto: CreateNvimPluginDto) {
    return 'This action adds a new nvimPlugin';
  }

  async getUserDataFromToken(id_token: string): Promise<User | null>{
    try {
      const user = await this.userModel.findOne({ id_token }).exec()
      return user
    } catch (error) {
      console.error('Error retrieving user:', error)
      return null
    }
  }
}
