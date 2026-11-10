import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { Movie } from '../../movies/entities/movie.entity';

@Entity('screenings')
export class Screening {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('date')
  date: string; // Формат YYYY-MM-DD

  @Column('time')
  time: string; // Формат HH:mm

  @Column()
  hall: string; // Название зала (например, "Зал 1")

  @Column('int')
  price: number; // Цена в рублях

  @Column('int', { default: 50 })
  totalSeats: number; // Всего мест в зале

  @Column('int', { default: 0 })
  bookedSeats: number; // Занято мест

  // Связь: сеанс привязан к конкретному фильму
  @ManyToOne(() => Movie, (movie) => movie.screenings, { onDelete: 'CASCADE' })
  movie: Movie;
}