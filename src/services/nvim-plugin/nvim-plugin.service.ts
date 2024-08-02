import { Injectable } from '@nestjs/common';
import { CreateNvimPluginDto } from 'src/controllers/nvim-plugin/dto/create-nvim-plugin.dto';

@Injectable()
export class NvimPluginService {
  getNvimData(createNvimPluginDto: CreateNvimPluginDto) {
    return 'This action adds a new nvimPlugin';
  }
}
