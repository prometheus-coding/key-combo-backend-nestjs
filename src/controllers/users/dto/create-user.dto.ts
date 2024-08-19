import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'xXjohndoeXx_swaggerITA', description: 'The username of the user' })
  username: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'John', description: 'The name of the user' })
  first_name: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'Doe', description: 'The second name of the user' })
  last_name: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'john@example.com', description: 'The email of the user' })
  email: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'Password123!', description: 'The password of the user' })
  password: string;

}