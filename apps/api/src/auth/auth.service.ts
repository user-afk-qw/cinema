import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async register(dto: RegisterDto) {
    // Проверяем, есть ли такой логин
    const existingUser = await this.usersService.findByLogin(dto.login);
    if (existingUser) {
      throw new ConflictException('Пользователь с таким логином уже существует');
    }

    // Хешируем пароль
    const passwordHash = await bcrypt.hash(dto.password, 10);
    
    // Создаем пользователя (первый зарегистрированный пусть будет админом для теста, или можно просто 'user')
    const role = dto.login === 'admin' ? 'admin' : 'user'; 
    const user = await this.usersService.create(dto.login, passwordHash, role);

    return this.generateToken(user.id, user.login, user.role);
  }

  async login(dto: LoginDto) {
    const user = await this.usersService.findByLogin(dto.login);
    if (!user) {
      throw new UnauthorizedException('Неверный логин или пароль');
    }

    const isPasswordValid = await bcrypt.compare(dto.password, user.passwordHash);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Неверный логин или пароль');
    }

    return this.generateToken(user.id, user.login, user.role);
  }

  private generateToken(id: string, login: string, role: string) {
    const payload = { sub: id, login, role };
    return {
      token: this.jwtService.sign(payload),
      user: { id, login, role },
    };
  }
}