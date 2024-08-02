import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { NvimPluginService } from 'src/services/nvim-plugin/nvim-plugin.service';
import { CreateNvimPluginDto } from './dto/create-nvim-plugin.dto';
import { UpdateNvimPluginDto } from './dto/update-nvim-plugin.dto';

@Controller('nvim-plugin')
export class NvimPluginController {
  constructor(private readonly nvimPluginService: NvimPluginService) {}

  @Post()
  create(@Body() createNvimPluginDto: CreateNvimPluginDto) {
      return this.nvimPluginService.getNvimData(createNvimPluginDto);
  }

}
