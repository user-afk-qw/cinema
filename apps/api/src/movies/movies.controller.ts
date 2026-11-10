import { Controller, Get, Query, Post, Body } from '@nestjs/common';
import { MoviesService } from './movies.service';

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Get('search')
  search(@Query('q') query: string) {
    if (!query) return [];
    return this.moviesService.searchMovies(query);
  }

  // НОВЫЙ РОУТ: Сохранение фильма
  @Post('add')
  addMovie(@Body() movieData: any) {
    return this.moviesService.saveMovie(movieData);
  }
}