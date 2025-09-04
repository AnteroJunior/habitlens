import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import { AuthService } from './auth.service';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';

@ApiTags('Autenticação')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  @ApiOperation({ summary: 'Cadastrar novo usuário' })
  @ApiResponse({
    status: 201,
    description: 'Usuário criado com sucesso',
    schema: {
      example: {
        message: 'Usuário criado com sucesso',
        user: {
          id: '507f1f77bcf86cd799439011',
          name: 'João Silva',
          email: 'joao@example.com',
        },
      },
    },
  })
  @ApiResponse({ status: 400, description: 'Dados inválidos' })
  @ApiResponse({ status: 409, description: 'Usuário já existe' })
  async signup(@Body() user: CreateUserDto) {
    try {
      const response = await this.authService.register(user);
      return response;
    } catch (error: any) {
      return error;
    }
  }

  @Post('signin')
  @ApiOperation({ summary: 'Fazer login do usuário' })
  @ApiResponse({
    status: 200,
    description: 'Login realizado com sucesso',
    schema: {
      example: {
        access_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
        user: {
          id: '507f1f77bcf86cd799439011',
          name: 'João Silva',
          email: 'joao@example.com',
        },
      },
    },
  })
  @ApiResponse({ status: 400, description: 'Dados inválidos' })
  @ApiResponse({ status: 401, description: 'Credenciais inválidas' })
  async signin(@Body() user: LoginDto) {
    try {
      const response = await this.authService.login(user);
      return response;
    } catch (error: any) {
      return error;
    }
  }

  @Get()
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Teste de rota autenticada' })
  @ApiResponse({ status: 200, description: 'Rota funcionando' })
  @ApiResponse({ status: 401, description: 'Não autorizado' })
  teste() {
    return 'teste';
  }
}
