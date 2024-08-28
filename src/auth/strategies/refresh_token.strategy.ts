import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { Request } from "express";
import { Injectable, Logger } from "@nestjs/common";
import { JwtPayload } from "./access_token.strategy";


Injectable()
export class RefreshTokenStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {

    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: 'rt-secret',
            passReqToCallback: true,
        })
    }
    
    async validate(req: Request, payload: JwtPayload) {
        // Log the headers to check if the authorization header is present
        console.log('Authorization Header:', req.headers['authorization']);

        const refreshToken = req.get('authorization')?.replace('Bearer', '').trim();
        const refreshTokenASD = req.get('Authorization')?.replace('Bearer', '').trim();

        // Log the extracted refresh token to check its value
        console.log('Extracted Refresh Token:', refreshToken);
        console.log('Extracted Refresh TokenASD:', refreshTokenASD);
        return {
            ...payload,
            refreshToken
        }
    }
}