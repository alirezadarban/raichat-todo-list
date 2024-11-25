import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { GetUserQuery } from '../impl/get-user.query';
import { User } from '../../entities/user.entity';

@QueryHandler(GetUserQuery)
export class GetUsersHandler implements IQueryHandler<GetUserQuery> {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async execute(id: GetUserQuery): Promise<User> {
    const user = await this.userRepository.findOneOrFail(
      { 
        where: {
          id: id.id
      }, 
      relations: ['todoLists'] 
    });
    delete user.password;
    return user;
  }
}
