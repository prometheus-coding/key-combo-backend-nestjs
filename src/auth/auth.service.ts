import { Injectable } from '@nestjs/common';
import { AuthDto } from './dto';
import { UsersService } from 'src/services/users/users.service';
import { CreateUserDto } from 'src/controllers/users/dto/create-user.dto';
@Injectable()
export class AuthService {

    constructor(
        private userService: UsersService
    ){}

    signupLocal(createUserDto: CreateUserDto){
        const newUser: CreateUserDto = {
            email: createUserDto.email,
            password: createUserDto.password,
            username: createUserDto.username,
            first_name: createUserDto.first_name,
            last_name: createUserDto.last_name      
        }
        console.log(newUser)
    }

    signinLocal(){}
    
    logout(){}

    refreshTokens(){}
}
