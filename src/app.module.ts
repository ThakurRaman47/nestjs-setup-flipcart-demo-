import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ProductsModule } from './products/products.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm'
import { ThrottlerModule } from '@nestjs/throttler';

@Module({
  imports: [ 
    ThrottlerModule.forRoot([{
      ttl: 60, 
      limit: 10
    }]),
    ConfigModule.forRoot({ isGlobal: true}),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'admin',
      database: 'flipcart',
      entities: [],
      retryAttempts:5,
      autoLoadEntities: true
      // synchronize: true,
    }),
    // TypeOrmModule.forFeature([User]),
    UserModule, ProductsModule, AuthModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
