import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/user.schema';
import { UsersService } from './services/users.service';
import { CqrsModule } from '@nestjs/cqrs';
import { SignupHandler } from './commands/handlers/signup.handler';
import { SigninHandler } from './commands/handlers/signin.handler';
import { AuthModule } from 'src/modules/auth/auth.module';
import { UsersController } from './controllers/users.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    CqrsModule,
    forwardRef(() => AuthModule),
  ],
  controllers: [UsersController], 
  providers: [
    UsersService,
    SignupHandler,
    SigninHandler,
  ],
  exports: [UsersService],
})
export class UsersModule {}
