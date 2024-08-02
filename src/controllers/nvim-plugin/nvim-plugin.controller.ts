import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { NvimPluginService } from 'src/services/nvim-plugin/nvim-plugin.service';
import { CreateNvimPluginDto } from './dto/create-nvim-plugin.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from '../users/dto/create-user.dto';
@ApiTags('nvim')
@Controller('nvim-plugin')
export class NvimPluginController {
  constructor(private readonly nvimPluginService: NvimPluginService) {}

  @Post()
  @ApiOperation({ summary: 'Retrieve nvim score data' })
  @ApiResponse({
    status: 201,
    description: 'The user has been successfully created.',
  })
  async create(@Body() createNvimPluginDto: CreateNvimPluginDto) {
      return this.nvimPluginService.getNvimData(createNvimPluginDto);
  }
  @Post('/getUserFromToken')
  @ApiOperation({ summary: 'Get user data from token' })
  @ApiResponse({
    status: 201,
    description: 'The user has been successfully created.',
  })
  async getUserDataFromTokenId (@Body() id_token: string){
    return await this.nvimPluginService.getUserDataFromToken(id_token)
  }

}
