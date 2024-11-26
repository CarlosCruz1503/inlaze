import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MoviesService } from './movies.service';
import { MoviesController } from './movies.controller';
import { MovieSchema } from './models/movies.model';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Movie', schema: MovieSchema }]), 
  ],
  controllers: [MoviesController],
  providers: [MoviesService],
  exports: [MoviesService], 
})
export class MoviesModule {}
