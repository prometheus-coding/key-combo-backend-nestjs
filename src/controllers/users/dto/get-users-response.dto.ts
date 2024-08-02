import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/services/users/users.schema';

export class GetUsersResponseDto {
  @ApiProperty({ type: [User], description: 'Array of users' })
  users: User[];

  @ApiProperty({ example: 10, description: 'Number of users returned' })
  count: number;
}