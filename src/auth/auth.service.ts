import { Injectable } from '@nestjs/common';
import { AuthDto } from './dto';
import { UsersService } from 'src/services/users/users.service';
import { CreateUserDto } from 'src/controllers/users/dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';
import { Tokens } from './types/tokens.type';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from 'src/services/users/users.schema';
import { Model } from 'mongoose';
@Injectable()
export class AuthService {

    constructor(
        @InjectModel(User.name) private userModel: Model<UserDocument>,
        private userService: UsersService,
        private jwtService: JwtService
    ){}

    private generateRandomToken(): string {
        return crypto.randomBytes(32).toString('hex');
      }

    hashData(data: string) {
        const saltOrRounds = 10;
        return bcrypt.hash(data, saltOrRounds)
    }

    async getTokens(userid: string, email:string){
        const [at, rt] = await Promise.all([
            this.jwtService.signAsync({
                sub: userid,
                email,
    
            },{
                secret: 'at-secret',
                expiresIn: 60 * 15,
            }),
            this.jwtService.signAsync({
                sub: userid,
                email,
    
            },{
                secret: 'rt-secret',
                expiresIn: 60 * 60 * 24 * 7,
            })
            
        ])
        return {
            access_token :at,
            refresh_token: rt
        }
    }

    async signupLocal(createUserDto: CreateUserDto): Promise<Tokens>{

        const hashedPassword = await this.hashData(createUserDto.password)
        const userDto: CreateUserDto = {
            email: createUserDto.email,
            password: hashedPassword,
            username: createUserDto.username,
            first_name: createUserDto.first_name,
            last_name: createUserDto.last_name,
        }
        const newUser = new this.userModel({
            ...userDto,
            id_token: this.generateRandomToken()
        })
        console.log(newUser)
        newUser.save()

        const tokens = await this.getTokens(newUser.id_token, newUser.email)
        return tokens
    }

    signinLocal(){}
    
    logout(){}

    refreshTokens(){}
}
