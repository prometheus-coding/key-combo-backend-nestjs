import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/users/users.schema';

export class GetUsersResponseDto {
  @ApiProperty({ example: 200, description: 'Array of users' })
  status: number

  @ApiProperty({ example: 'Users retrieved successfully', description: 'Array of users' })
  message: string

  @ApiProperty({ type: [User], description: 'Array of users' })
  data: User[];

  @ApiProperty({ example: 10, description: 'Number of users returned' })
  count: number;
}