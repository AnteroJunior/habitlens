import { ConflictException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/database/schemas/user.schema';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private readonly jwtService: JwtService,
  ) {}

  async register(user: CreateUserDto) {
    const exists = await this.userModel.findOne({ email: user.email }).exec();
    console.log(exists);
    if (exists) {
      throw new ConflictException('Email já cadastrado');
    }

    const hashPassword = bcrypt.hashSync(user.password, 10);
    user.password = hashPassword;

    const newUser = new this.userModel(user);
    return await newUser.save();
  }

  async login(user: LoginDto) {
    const exists = await this.userModel.findOne({ email: user.email }).exec();
    if (!exists) {
      throw new ConflictException('Email não cadastrado');
    }

    const isValid = bcrypt.compareSync(user.password, exists.password);
    if (!isValid) {
      throw new ConflictException('Senha inválida');
    }

    const payload = { name: exists.name, sub: exists._id, email: exists.email };
    return {
      access_token: this.jwtService.sign(payload),
    };

    return exists;
  }
}
