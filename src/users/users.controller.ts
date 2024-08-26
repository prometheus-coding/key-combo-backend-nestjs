import { Controller, Get, Post, Body } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { GetUsersResponseDto } from './dto/get-users-response.dto';
import { User } from 'src/users/users.schema';
import { UsersService } from 'src/users/users.service';
import { UpdateUserScoreDto } from './dto/update-user-score.dto';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new user' })
  @ApiResponse({
    status: 201,
    description: 'The user has been successfully created.',
    type: User
  })
  async create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }
  @Post('/updateUserScore')
  @ApiOperation({ summary: 'Create a new user' })
  @ApiResponse({
    status: 201,
    description: 'The user has been successfully created.',
    type: User
  })
  async updateUserScore(@Body() updateUserScoreDto: UpdateUserScoreDto) {
    return this.usersService.updateUserScore(updateUserScoreDto)
  }

  @Get()
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: 200, description: 'Return all users.', type: GetUsersResponseDto })
  async findAll() {
    const users = await this.usersService.findAll();
    return {users, count: users.length}
  }

  @Post('/getUserFromTokenId')
  @ApiOperation({ summary: 'Get user data from token' })
  @ApiResponse({
    status: 201,
    description: 'User retrieved successfully',
  })
  async getUserDataFromTokenId (@Body() id_token: string){
    return await this.usersService.getUserDataFromToken(id_token)
  }


  // Add other endpoints as needed
}
