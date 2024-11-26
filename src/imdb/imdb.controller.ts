// src/external-api/external-api.controller.ts
import { Controller, Get, Post, Body, Query, Param } from '@nestjs/common';
import { ImdbService } from './imdb.service';

@Controller('imdb')
export class ImdbController {
  constructor(private readonly ImdbService: ImdbService) {}

  @Get('movies/')
  async getMovies(@Query() queryParams: any) { 
    const data = await this.ImdbService.getMovies(queryParams).toPromise(); 
    return { statusCode: 200, data }; 
  }

  @Get('movies/:category') 
  async getMoviesByIdOrCategory(@Param('category') category: string, @Query() queryParams: any) {
    const data = await this.ImdbService.getMoviesByIdOrCategory(category, queryParams).toPromise();
    return { statusCode: 200, data };
  }

  @Get('movies_filter/:id/:idFilter')
  async getMoviesIdFilter(@Param('id') id: string, @Param('idFilter') idFilter: string, ) {
    const data = await this.ImdbService.getMoviesIdFilter(id, idFilter).toPromise();
    return { statusCode: 200, data };
  }

  @Get('movies_search/')
  async getSearchMovies(@Query() queryParams: any) { 
    const data = await this.ImdbService.getSearchMovies(queryParams).toPromise(); 
    return { statusCode: 200, data }; 
  }

  @Get('genre')
  async getGenreMovies(@Query() queryParams: any) { 
    const data = await this.ImdbService.getGenreMovies(queryParams).toPromise(); 
    return { statusCode: 200, data }; 
  }
 

}
