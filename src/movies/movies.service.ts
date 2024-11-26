import { Injectable,HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MovieDocument } from './models/movies.model';
import { CreateMoviesDto } from './dto/create_movies';

@Injectable()
export class MoviesService {
    constructor(
        @InjectModel('Movie') private readonly movieModel: Model<MovieDocument>,
    ) { }

    async createFM(createFMDto: CreateMoviesDto) {
        await this.movieModel.create(createFMDto);
        return { message: 'Pelicula agregada a favoritos' };
    }

    async getFM(userId: string) {
        const data = await this.movieModel.find({ userId });
        return { data };
    }

    async deleteFM(idMovie: string, userId:string) {
        let deleted = await this.movieModel.deleteOne({ idMovie: idMovie, userId:userId });
        
        if (deleted.deletedCount > 0){
            return { message: 'Pelicula eliminada de favoritos' };
        }else{
            throw new HttpException('Error al eliminar', HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }
}
