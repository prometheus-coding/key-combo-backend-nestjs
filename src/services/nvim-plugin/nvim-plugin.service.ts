import { Injectable, Logger } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { NvimPluginDto } from 'src/controllers/nvim-plugin/dto/create-nvim-plugin.dto';
import { User, UserDocument } from '../users/users.schema';
import { Connection, Model } from 'mongoose';

@Injectable()
export class NvimPluginService {
  private readonly logger = new Logger(NvimPluginService.name);
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectConnection() private connection: Connection
  ){
    console.log('Database name:', this.connection.name);
    console.log('Nvim service successfully mapped to ', Object.keys(this.connection.collections), 'collection');
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

// Metti i commenti dio bono
  async getNvimData(nvimPluginDto: NvimPluginDto) {
    this.logger.log(`request received:${JSON.stringify(nvimPluginDto)}`)
    const id_token = nvimPluginDto.id_token
    const user = await this.getUserDataFromToken(id_token)
    this.logger.log(`User retrieved with token ${id_token}:\n${JSON.stringify(user, null, 2)}`);
  }

}
