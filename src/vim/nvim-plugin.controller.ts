import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { NvimPluginService } from 'src/vim/nvim-plugin.service';
import { sendNvimDataDto } from './dto/sendNvimData.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from '../users/dto/create-user.dto';
@ApiTags('nvim')
@Controller('nvim-plugin')
export class NvimPluginController {
  constructor(private readonly nvimPluginService: NvimPluginService) {}

  @Post('/sendScore')
  @ApiOperation({ summary: 'Retrieve nvim score data' })
  @ApiResponse({
    status: 201,
    description: 'The user has been successfully created.',
  })
  async sendScore(@Body() createNvimPluginDto: sendNvimDataDto) {
      return this.nvimPluginService.sendNvimScoreData(createNvimPluginDto);
  }

}
