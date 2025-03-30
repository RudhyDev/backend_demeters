import { Inject, Injectable } from '@nestjs/common';
import { User } from 'src/user/domain/entities/user.entity';
import { IUserRepository } from 'src/user/domain/interfaces/repositories/user-repository.interface';

@Injectable()
export class LoginUserUseCase {
  constructor(
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,
  ) {}

  async execute(email: string, password: string): Promise<{ token: string }> {
    try {
      const user: User | null = await this.userRepository.findByEmail(email);

      if (!user || user.password !== password) {
        //TODO: Implementar comparação de hash de senha
        throw new Error('Credenciais inválidas');
      }

      //TODO: Implementar geração de token JWT
      const token = 'token-jwt-gerado';

      return { token };
    } catch (error) {
      throw error;
    }
  }
}
