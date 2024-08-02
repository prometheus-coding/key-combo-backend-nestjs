import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { NvimPluginController } from 'src/controllers/nvim-plugin/nvim-plugin.controller';
import { NvimPluginService } from 'src/services/nvim-plugin/nvim-plugin.service';
import { User, UserSchema } from 'src/services/users/users.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])
  ],
  controllers: [NvimPluginController],
  providers: [NvimPluginService],
  exports: [NvimPluginService],
})
export class NvimPluginModule {}