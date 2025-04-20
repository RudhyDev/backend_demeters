import { Inject, Injectable } from '@nestjs/common';
import { User } from 'src/user/domain/entities/user.entity';
import { IUserRepository } from 'src/user/domain/interfaces/repositories/user-repository.interface';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class LoginUserUseCase {
  constructor(
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async execute(email: string, password: string): Promise<{ token: string }> {
    try {
      const user: User | null = await this.userRepository.findByEmail(email);

      const isPasswordValid = user
        ? await bcrypt.compare(password, user.password)
        : false;

      if (!user || !isPasswordValid) {
        throw new Error('Credenciais inválidas');
      }

      const token = this.jwtService.sign({
        id: user.id,
        name: user.name,
        email: user.email,
      });

      return { token };
    } catch (error) {
      throw error;
    }
  }
}
