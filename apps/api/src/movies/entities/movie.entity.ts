import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Screening } from '../../screenings/entities/screening.entity';

@Entity('movies')
export class Movie {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  kinopoiskId: number; // ID из Кинопоиска, чтобы не дублировать фильмы

  @Column()
  title: string;

  @Column('text', { nullable: true })
  overview: string;

  @Column('float', { default: 0 })
  rating: number;

  @Column({ nullable: true })
  releaseYear: number;

  @Column({ nullable: true })
  posterPath: string;

  // Связь: у одного фильма может быть много сеансов
  @OneToMany(() => Screening, (screening) => screening.movie)
  screenings: Screening[];
}