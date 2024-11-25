import { forwardRef, Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { SignupHandler } from './commands/handlers/signup.handler';
import { SigninHandler } from './commands/handlers/signin.handler';
import { GetUsersHandler } from './queries/handler/get-user.handler'
import { AuthModule } from 'src/modules/auth/auth.module';
import { UsersController } from './controllers/users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity'; 
import { UsersService } from './services/users.service';

@Module({
  imports: [
    CqrsModule,
    forwardRef(() => AuthModule),
    TypeOrmModule.forFeature([User])
  ],
  controllers: [UsersController], 
  providers: [
    SignupHandler,
    SigninHandler,
    GetUsersHandler,
    UsersService
  ],
  exports:[UsersService]
})
export class UsersModule {}
