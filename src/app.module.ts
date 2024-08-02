import { Logger, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './services/users/users.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { NvimPluginModule } from './services/nvim-plugin/nvim-plugin.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGO_URI'),
      }),
      inject: [ConfigService],
    }),
    UsersModule,
    NvimPluginModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}