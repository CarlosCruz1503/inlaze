import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UnauthorizedException } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
@Injectable()
export class AuthMiddleware {
    constructor(private jwtService: JwtService) { }

    async use(req: any, res: any, next: () => void) {
        const token = req.headers.authorization?.split(' ')[1];

        if (!token) {
            throw new UnauthorizedException('No token provided');
        }

        try {
            console.log('Decoding token with secret:', process.env.SECRET_KEY);
            const decoded = jwt.verify(token, process.env.SECRET_KEY || '');
            req.user = decoded;
            next();
        } catch (error) {
            console.log(error)
            throw new UnauthorizedException('Invalid token');
        }
    }
}
