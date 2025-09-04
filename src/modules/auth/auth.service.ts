import { ConflictException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcryptjs';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async register(user: CreateUserDto) {
    const exists = await this.userRepository.findOneBy({ email: user.email });
    if (exists) {
      throw new ConflictException('Email já cadastrado');
    }

    const hashPassword = bcrypt.hashSync(user.password, 10);
    user.password = hashPassword;

    const newUser = Object.assign(new User(), user);

    return this.userRepository.save(newUser);
  }

  async login(user: LoginDto) {
    const userExists = await this.userRepository.findOneBy({
      email: user.email,
    });

    if (!userExists) {
      throw new ConflictException('Email não cadastrado');
    }

    const isValid = bcrypt.compareSync(user.password, userExists.password);
    if (!isValid) {
      throw new ConflictException('Senha inválida');
    }

    const payload = {
      name: userExists.name,
      sub: userExists.id,
      email: userExists.email,
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
