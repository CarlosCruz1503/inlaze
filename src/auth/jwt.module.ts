import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { ConfigModule } from '@nestjs/config';

@Module({
    imports: [
        JwtModule.register({
            secret: process.env.SECRET_KEY || 'default_secret', // Si estás usando variables de entorno
            signOptions: { expiresIn: '24h' },
        }),
        ConfigModule.forRoot(),
    ],
    providers: [JwtStrategy],
    exports: [JwtModule],
})
export class JwtAuthModule { }
