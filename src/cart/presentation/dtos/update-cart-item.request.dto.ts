import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsUUID, Min } from 'class-validator';

export class UpdateCartItemRequestDto {
  @ApiProperty({
    description: 'ID do produto',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsNotEmpty({ message: 'O ID do produto é obrigatório' })
  @IsUUID(4, { message: 'O ID do produto deve ser um UUID válido' })
  productId: string;

  @ApiProperty({
    description: 'Nova quantidade do produto',
    example: 2,
    minimum: 0,
  })
  @IsNotEmpty({ message: 'A quantidade é obrigatória' })
  @IsInt({ message: 'A quantidade deve ser um número inteiro' })
  @Min(0, { message: 'A quantidade mínima é 0 (para remover o item)' })
  quantity: number;
}
