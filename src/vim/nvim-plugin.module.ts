import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { NvimPluginController } from 'src/vim/nvim-plugin.controller';
import { NvimPluginService } from 'src/vim/nvim-plugin.service';
import { User, UserSchema } from 'src/users/users.schema';
import { UsersService } from '../users/users.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])
  ],
  controllers: [NvimPluginController],
  providers: [NvimPluginService, UsersService],
})
export class NvimPluginModule {}