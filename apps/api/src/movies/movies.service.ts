import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Movie } from './entities/movie.entity';
import axios from 'axios';

@Injectable()
export class MoviesService {
    constructor(
        private readonly httpService: HttpService,
        private readonly configService: ConfigService,
        @InjectRepository(Movie)
        private moviesRepository: Repository<Movie>,
    ) { }

    async searchMovies(query: string) {
        const apiKey = this.configService.get<string>('KINOPOISK_KEY');
        if (!apiKey) throw new HttpException('API Key не настроен', HttpStatus.INTERNAL_SERVER_ERROR);

        try {
            const { data } = await firstValueFrom(
                this.httpService.get('https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword', {
                    params: { keyword: query, page: 1 },
                    headers: { 'X-API-KEY': apiKey, 'Content-Type': 'application/json' },
                }),
            );

            return data.films.map((film: any) => ({
                tmdbId: film.filmId,
                title: film.nameRu || film.nameEn,
                overview: film.description || 'Описание отсутствует',
                rating: film.rating ? parseFloat(film.rating) : 0,
                releaseYear: film.year ? parseInt(film.year) : null,
                posterPath: film.posterUrlPreview,
            }));
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.error(error.response?.data ?? error.message);
            } else if (error instanceof Error) {
                console.error(error.message);
            } else {
                console.error(error);
            }
            throw new HttpException('Ошибка при запросе к TMDB', HttpStatus.BAD_GATEWAY);
        }
    }

    // НОВЫЙ МЕТОД: Сохраняем фильм в базу данных
    async saveMovie(movieData: any) {
        // Проверяем, есть ли уже такой фильм в базе (по kinopoiskId)
        const existing = await this.moviesRepository.findOne({ where: { kinopoiskId: movieData.tmdbId } });
        if (existing) {
            return existing; // Если есть, просто возвращаем его
        }

        // Если нет — создаем новый
        const newMovie = this.moviesRepository.create({
            kinopoiskId: movieData.tmdbId,
            title: movieData.title,
            overview: movieData.overview,
            rating: movieData.rating,
            releaseYear: movieData.releaseYear,
            posterPath: movieData.posterPath,
        });

        return await this.moviesRepository.save(newMovie);
    }
}