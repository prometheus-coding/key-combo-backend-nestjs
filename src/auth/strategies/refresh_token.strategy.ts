import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { Request } from "express";
import { Injectable, Logger } from "@nestjs/common";


Injectable()
export class RefreshTokenStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {

    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: 'rt-secret',
            passReqToCallback: true,
        })
    }
    
    // validate(req: Request, payload: any) {
    //     // Log the headers to check if the authorization header is present
    //     console.log('Authorization Header:', req.headers['authorization']);

    //     const refreshToken = req.get('authorization')?.replace('Bearer', '').trim();
    //     const refreshTokenASD = req.get('Authorization')?.replace('Bearer', '').trim();

    //     // Log the extracted refresh token to check its value
    //     console.log('Extracted Refresh Token:', refreshToken);
    //     console.log('Extracted Refresh TokenASD:', refreshTokenASD);
    //     return {
    //         ...payload,
    //         refreshToken
    //     }
    // }
}