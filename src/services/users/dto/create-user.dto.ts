import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 'xXjohndoeXx_swaggerITA', description: 'The username of the user' })

  username: string;
  @ApiProperty({ example: 'John', description: 'The name of the user' })
  firstName: string;

  @ApiProperty({ example: 'Doe', description: 'The second name of the user' })
  lastName: string;

  @ApiProperty({ example: 'john@example.com', description: 'The email of the user' })
  email: string;

  @ApiProperty({ example: 'Password123!', description: 'The password of the user' })
  password: string;

  @ApiProperty({ example: 60, description: 'The combo duration in seconds', default: 0 })
  combo_duration_in_seconds: number;

  @ApiProperty({ example: 1000, description: 'The total number of keys pressed', default: 0 })
  total_key_pressed: number;
}