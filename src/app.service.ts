import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
  constructor(private configService: ConfigService) {}

  getDatabaseUrl(): string {
    const dbString = this.configService.get<string>('MONGO_URI')
    return dbString ? dbString : ' '
  }
  getHello(): string {
    return 'Hello World!';
  }
}
