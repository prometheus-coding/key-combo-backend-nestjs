import { Injectable } from "@nestjs/common";
import * as crypto from 'crypto';
import * as bcrypt from 'bcrypt'

@Injectable()
export class UtilsService {

    generateRandomToken(): string {
        return crypto.randomBytes(32).toString('hex');
    }

    hashData(data: string) {
        const saltOrRounds = 10;
        return bcrypt.hash(data, saltOrRounds)
    }

}