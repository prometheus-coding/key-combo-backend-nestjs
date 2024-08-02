import { Module } from '@nestjs/common';
import { NvimPluginService } from 'src/services/nvim-plugin/nvim-plugin.service';
import { NvimPluginController } from './nvim-plugin.controller';

@Module({
  controllers: [NvimPluginController],
  providers: [NvimPluginService],
})
export class NvimPluginModule {}
