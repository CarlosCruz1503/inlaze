import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MoviesService } from './movies.service';
import { MoviesController } from './movies.controller';
import { MovieSchema } from './models/movies.model';
import { AuthMiddleware } from 'src/auth/auth.middleware';
import { HttpModule } from '@nestjs/axios'; 
import { JwtModule } from '@nestjs/jwt';
@Module({
  imports: [JwtModule.register({
    secret: process.env.JWT_SECRET, 
    signOptions: { expiresIn: '1h' },
  }), HttpModule, MongooseModule.forFeature([{ name: 'Movie', schema: MovieSchema }]), ],

  controllers: [MoviesController],
  providers: [MoviesService],
  exports: [MoviesService], 
})

export class MoviesModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('movie'); 
  }
}
