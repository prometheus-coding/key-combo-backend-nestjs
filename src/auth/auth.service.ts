import { Injectable } from '@nestjs/common';
import { AuthDto } from './dto';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';
import { Tokens } from './types/tokens.type';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from 'src/users/users.schema';
import { Model } from 'mongoose';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UtilsService } from 'src/utils/utils';

@Injectable()
export class AuthService {

    constructor(
        @InjectModel(User.name) private userModel: Model<UserDocument>,
        private userService: UsersService,
        private jwtService: JwtService,
        private utils: UtilsService
    ){}




    
    async getTokens(userId: string, email: string) {
        const [at, rt] = await Promise.all([
            this.jwtService.signAsync({
                sub: userId,
                email,
            },{
                secret: 'at-secret',
                expiresIn: 60 * 15,
            }),
            this.jwtService.signAsync({
                sub: userId,
                email,
            },{
                secret: 'rt-secret',
                expiresIn: 60 * 60 * 24 * 7,
            })
        ])
        return {
            access_token: at,
            refresh_token: rt
        }
    }

    async signupLocal(createUserDto: CreateUserDto): Promise<Tokens> {
        const hashedPassword = await this.utils.hashData(createUserDto.password)
        const userDto: CreateUserDto = {
            email: createUserDto.email,
            password: hashedPassword,
            username: createUserDto.username,
            first_name: createUserDto.first_name,
            last_name: createUserDto.last_name,
        }
        const newUser = new this.userModel({
            ...userDto,
            id_token: this.utils.generateRandomToken()
        });
        await newUser.save();

        // Use the _id (which is the same as userId) for token generation
        const tokens = await this.getTokens(newUser._id.toString(), newUser.email)
        return tokens
    }

    signinLocal(){}
    
    logout(){}

    refreshTokens(){}
}