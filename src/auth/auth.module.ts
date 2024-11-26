import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtStrategy } from './jwt.strategy';
import { JwtModule } from '@nestjs/jwt';
@Module({
    imports: [ConfigModule.forRoot(), 
        JwtModule.register({
        secret: process.env.SECRET_KEY || 'default_secret', 
        signOptions: { expiresIn: '24h' },
    }),], 
    providers: [JwtModule], 
})
export class AuthModule { }
