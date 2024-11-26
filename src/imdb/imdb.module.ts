// src/external-api/external-api.module.ts
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios'; // Importar HttpModule
import { ImdbController } from './imdb.controller';
import { ImdbService } from './imdb.service';
import { AuthMiddleware } from 'src/auth/auth.middleware';
import { JwtModule } from '@nestjs/jwt';
@Module({
  imports: [JwtModule.register({
    secret: process.env.JWT_SECRET, 
    signOptions: { expiresIn: '1h' },
  }), HttpModule],
  providers: [ImdbService],
  controllers: [ImdbController],
})
export class ImdbModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('imdb'); 
  }
}
