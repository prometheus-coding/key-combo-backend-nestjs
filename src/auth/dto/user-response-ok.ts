import { ApiProperty } from '@nestjs/swagger';

class CreatedUserDto {
    @ApiProperty({ example: 'john_doe', description: 'The username of the user' })
    username: string;
    @ApiProperty({ example: 'john_doe@email.com', description: 'The username of the user' })
    email: string;

    @ApiProperty({ example: 'John', description: 'The first name of the user' })
    first_name: string;

    @ApiProperty({ example: 'Doe', description: 'The last name of the user' })
    last_name: string;

    @ApiProperty({ example: 'Token used for vim', description: 'The last name of the user' })
    vimToken: string

    @ApiProperty({ example: 'someAccessToken12345', description: 'The access token for the user' })
    access_token: string;

    @ApiProperty({ example: 'someRefreshToken12345', description: 'The refresh token for the user' })
    refresh_token: string;
}

export class UserResponseSignupOk {
    @ApiProperty({ example: 'User signed up successfully', description: 'The user creation message' })
    message: string;

    @ApiProperty({ example: 200, description: 'The HTTP status code' })
    status: number;

    @ApiProperty({ type: CreatedUserDto, description: 'The details of the created user' })
    data: CreatedUserDto;
}
