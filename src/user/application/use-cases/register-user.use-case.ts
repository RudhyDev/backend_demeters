import { Inject, Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { User } from 'src/user/domain/entities/user.entity';
import { IUserRepository } from 'src/user/domain/interfaces/repositories/user-repository.interface';
import { RegisterUserResponseDto } from './dtos/register-user-response.dto';

@Injectable()
export class RegisterUserUseCase {
  constructor(
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,
  ) {}

  async execute(userData: {
    name: string;
    email: string;
    password: string;
    phone: string;
  }): Promise<RegisterUserResponseDto> {
    const existingUser: User | null = await this.userRepository.findByEmail(userData.email);

    if (existingUser) {
      throw new Error('Usuário com este email já existe');
    }

    const user = new User(
      randomUUID(),
      userData.name,
      userData.email,
      userData.password,
      userData.phone,
      new Date(),
      new Date(),
    );

    await this.userRepository.create(user);
    return { id: user.id };
  }
}
