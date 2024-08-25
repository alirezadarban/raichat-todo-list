// src/auth/auth.module.ts
import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import { UsersModule } from '../users/users.module';
import { JwtAuthGuard } from './jwt-auth.guard';

@Module({
  imports: [
    forwardRef(() => UsersModule),
    PassportModule,
    JwtModule.register({
      secret: 'secretKey', // Use env variables in production
      signOptions: { expiresIn: '60m' },
    }),
  ],
  providers: [JwtStrategy, JwtAuthGuard],
  exports: [JwtModule, JwtAuthGuard],
})
export class AuthModule {}
