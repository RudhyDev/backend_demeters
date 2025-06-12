import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';

export class CreateCartRequestDto {
  @ApiProperty({
    description: 'ID do usuário',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsNotEmpty({ message: 'O ID do usuário é obrigatório' })
  @IsUUID(4, { message: 'O ID do usuário deve ser um UUID válido' })
  userId: string;
}
