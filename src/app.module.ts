import { Module } from '@nestjs/common';
import { PrismaModule } from './infra/database/prisma.module';
import { UserModule } from './user/user.module';
import { JwtGlobalModule } from './auth/jwt-global.module';

@Module({
  imports: [JwtGlobalModule, PrismaModule, UserModule],
})
export class AppModule {}
