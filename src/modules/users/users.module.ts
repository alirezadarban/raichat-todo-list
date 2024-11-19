import { forwardRef, Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { SignupHandler } from './commands/handlers/signup.handler';
import { SigninHandler } from './commands/handlers/signin.handler';
import { AuthModule } from 'src/modules/auth/auth.module';
import { UsersController } from './controllers/users.controller';

@Module({
  imports: [
    CqrsModule,
    forwardRef(() => AuthModule),
  ],
  controllers: [UsersController], 
  providers: [
    SignupHandler,
    SigninHandler,
  ]
})
export class UsersModule {}
