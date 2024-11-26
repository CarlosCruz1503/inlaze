import { MoviesService } from './movies.service';
import { Body, Controller, Res,Post, HttpCode, Delete, Param, Get  } from '@nestjs/common';
import { CreateMoviesDto } from '../movies/dto/create_movies';



@Controller('movie')
export class MoviesController {
    constructor(private readonly MoviesService: MoviesService) { }
    @Post('create/')
    @HttpCode(201)
    async create(@Body() CreateMoviesDto: CreateMoviesDto) {
        return this.MoviesService.createFM(CreateMoviesDto);
    }

    @Delete('delete/:idMovie/:userId')
    @HttpCode(200)
    async delete(@Param('idMovie') idMovie: string,@Param('userId') userId) {
        return this.MoviesService.deleteFM(idMovie, userId);
    }

    @Get('list/:userId')
    @HttpCode(200)
    async list(@Param('userId') userId: string) {
        return this.MoviesService.getFM(userId);
    }
}
