import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  Logger,
  UnauthorizedException
} from '@nestjs/common';
import { AuthDto } from './dto';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';
import { Tokens } from './types/tokens.type';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from 'src/users/users.schema';
import { Model, ObjectId } from 'mongoose';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UtilsService } from 'src/utils/utils';
import { UpdateUserDto } from 'src/users/dto/update-user-dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private userService: UsersService,
    private jwtService: JwtService,
    private utils: UtilsService,
    private logger: Logger
  ) {}

  async getTokens(userId: string, email: string) {
    const [at, rt] = await Promise.all([
      this.jwtService.signAsync(
        {
          id: userId,
          email
        },
        {
          secret: 'at-secret',
          expiresIn: 60 * 15
        }
      ),
      this.jwtService.signAsync(
        {
          id: userId,
          email
        },
        {
          secret: 'rt-secret',
          expiresIn: 60 * 60 * 24 * 7
        }
      )
    ]);
    return {
      access_token: at,
      refresh_token: rt
    };
  }

  async signupLocal(createUserDto: CreateUserDto): Promise<Tokens> {
    try {
      const existingUser = await this.userService.findByEmail(
        createUserDto.email
      );
      if (existingUser) {
        throw new BadRequestException('Email already in use');
      }
      const hashedPassword = await this.utils.hashData(createUserDto.password);
      const userDto: CreateUserDto = {
        email: createUserDto.email,
        password: hashedPassword,
        username: createUserDto.username,
        first_name: createUserDto.first_name,
        last_name: createUserDto.last_name
      };
      const newUser = new this.userModel({
        ...userDto,
        id_token: this.utils.generateRandomToken()
      });
      await newUser.save();

      // Use the _id (which is the same as userId) for token generation
      const tokens = await this.getTokens(
        newUser._id.toString(),
        newUser.email
      );
      await this.updateRtHash(newUser.id, tokens.refresh_token);
      return tokens;
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new BadRequestException('Failed to create user');
    }
  }

  async updateRtHash(userId: string, rt: string) {
    const hash = await this.utils.hashData(rt);
    await this.userService.updateById(userId, { refreshToken: hash });
  }

  async signinLocal(authDto: AuthDto): Promise<Tokens> {
    try {
      const user = await this.userService.findByEmail(authDto.email);
      if (!user) {
        throw new UnauthorizedException('Invalid credentials');
      }

      const passwordMatches = bcrypt.compare(authDto.password, user.password);
      if (!passwordMatches) {
        throw new UnauthorizedException('Invalid credentials');
      }

      const tokens = await this.getTokens(user._id.toString(), user.email);
      await this.updateRtHash(user._id.toString(), tokens.refresh_token);
      return tokens;
    } catch (error) {
      if (error instanceof UnauthorizedException) {
        throw error;
      }
      throw new UnauthorizedException('Authentication failed');
    }
  }

  async logout(userId: string) {
    const user = await this.userService.findById(userId);
    if (user && user.refreshToken) {
      await this.userService.updateById(userId, { refreshToken: null });
    }
  }

  async refreshTokens(userId: string, refreshToken: string) {
    const user = await this.userService.findById(userId);
    this.logger.log(user);
    this.logger.log(userId)
    this.logger.log(refreshToken)
    if (!user) {
      throw new ForbiddenException('Access Denied');
    }
    // const rtMatches = await bcrypt.compare(refreshToken, user.refreshToken);
    // if (!rtMatches) {
    //   throw new ForbiddenException('Access Denied');
    // }

    const tokens = await this.getTokens(user._id.toString(), user.email);
    await this.updateRtHash(user._id.toString(), tokens.refresh_token);
    return tokens;
  }
}
