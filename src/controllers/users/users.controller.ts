import { Controller, Get, Post, Body } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from 'src/services/users/dto/create-user.dto';
import { GetUsersResponseDto } from 'src/services/users/dto/get-users-response.dto';
import { User } from 'src/services/users/users.schema';
import { UsersService } from 'src/services/users/users.service';

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

  @Get()
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: 200, description: 'Return all users.', type: GetUsersResponseDto })
  async findAll() {
    const users = await this.usersService.findAll();
    return {users, count: users.length}
  }

  // Add other endpoints as needed
}
