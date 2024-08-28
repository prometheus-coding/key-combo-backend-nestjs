import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Logger,
  Post,
  Req,
  UseGuards
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Tokens } from './types/tokens.type';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/users/users.schema';
import { Request } from 'express';
import { JwtPayload } from './strategies';
import { AccessTokenGuard, RefreshTokenGuard } from 'src/common/guards';
import { GetCurrentUser, GetCurrentUserId } from 'src/common/decorators';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private logger: Logger
  ) {}

  @Post('/local/signup')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a new user with signup' })
  @ApiResponse({
    status: 201,
    description: 'The user has been successfully created.'
  })
  signupLocal(@Body() createUserDto: CreateUserDto): Promise<Tokens> {
    return this.authService.signupLocal(createUserDto);
  }

  @Post('/local/signin')
  @HttpCode(HttpStatus.OK)
  signinLocal(@Body() authDto: AuthDto){
    return this.authService.signinLocal(authDto);
  }

  // @UseGuards(AccessTokenGuard)
  @Post('/logout')
  @HttpCode(HttpStatus.OK)
  logout(@GetCurrentUserId() userId: string) {
    return this.authService.logout(userId)
  }


  //TODO
  //Capire perché refresh_token.strategy.ts non viene mai chiamato
  @UseGuards(RefreshTokenGuard)
  @Post('/refresh')
  refreshTokens(
    // @GetCurrentUser('refreshToken') rt: string,
    @GetCurrentUserId() userId: string,
    @Req() req: Request
  ) {
    // this.logger.log(rt)
    const refreshToken = req.rawHeaders[1].replace('Bearer', '').trim()
    return this.authService.refreshTokens(userId, refreshToken)
  }
}
