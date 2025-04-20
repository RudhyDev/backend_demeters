import { Global, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

@Global()
@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'meu_texto_super_sercreto!',
      signOptions: { expiresIn: '24h' },
    }),
  ],
  exports: [JwtModule],
})
export class JwtGlobalModule {}
