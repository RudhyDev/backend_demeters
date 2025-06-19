import { Module } from '@nestjs/common';
import { PrismaModule } from './infra/database/prisma.module';
import { UserModule } from './user/user.module';
import { JwtGlobalModule } from './auth/jwt-global.module';
import { StoreModule } from './store/store.module';
import { ProductModule } from './product/product.module';
import { CartModule } from './cart/cart.module';

@Module({
  imports: [JwtGlobalModule, PrismaModule, UserModule, StoreModule, ProductModule, CartModule],
})
export class AppModule {}
