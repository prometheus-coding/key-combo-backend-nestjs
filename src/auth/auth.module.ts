import { Logger, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersService } from 'src/users/users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/users/users.schema';
import { AccessTokenStrategy, RefreshTokenStrategy } from './strategies';
import { JwtModule } from '@nestjs/jwt';
import { UtilsService } from 'src/utils/utils';
import { AccessTokenGuard, RefreshTokenGuard } from 'src/common/guards';
import { PassportModule } from '@nestjs/passport';
@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    JwtModule.register({}),
  ],
  providers: [
    AuthService,
    AccessTokenStrategy,
    RefreshTokenStrategy,
    UsersService,
    UtilsService,
    AccessTokenGuard,
    RefreshTokenGuard,
    Logger
  ],
  controllers: [AuthController]
})
export class AuthModule {}
