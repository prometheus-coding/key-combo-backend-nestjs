import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto';
import { CreateUserDto } from 'src/controllers/users/dto/create-user.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Tokens } from './types/tokens.type';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) {
    }
    
    @Post('/local/signup')
    @ApiOperation({ summary: 'Create a new user with signup' })
    @ApiResponse({
      status: 201,
      description: 'The user has been successfully created.',
    })
    signupLocal(@Body() createUserDto: CreateUserDto): Promise<Tokens>{
        return this.authService.signupLocal(createUserDto)
    }

    @Post('/local/signin')
    signinLocal(){
        this.authService.signinLocal()
    }
    
    @Post('/logout')
    logout(){
        this.authService.logout()
    }

    @Post('/refresh')
    refreshTokens(){
        this.authService.refreshTokens()
    }
}
