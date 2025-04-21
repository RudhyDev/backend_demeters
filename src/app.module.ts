import { Module } from '@nestjs/common';
import { PrismaModule } from './infra/database/prisma.module';
import { UserModule } from './user/user.module';
import { JwtGlobalModule } from './auth/jwt-global.module';
import { VendorModule } from './vendor/vendor.module';

@Module({
  imports: [JwtGlobalModule, PrismaModule, UserModule, VendorModule],
})
export class AppModule {}
