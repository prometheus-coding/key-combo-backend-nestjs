import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 'xXjohndoeXx_swaggerITA', description: 'The username of the user' })
  username: string;
  
  @ApiProperty({ example: 'John', description: 'The name of the user' })
  first_name: string;

  @ApiProperty({ example: 'Doe', description: 'The second name of the user' })
  last_name: string;

  @ApiProperty({ example: 'john@example.com', description: 'The email of the user' })
  email: string;

  @ApiProperty({ example: 'Password123!', description: 'The password of the user' })
  password: string;

}