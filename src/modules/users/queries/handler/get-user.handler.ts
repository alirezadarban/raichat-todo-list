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

  async execute(query: GetUserQuery): Promise<User[]> {
    return this.userRepository.find({ relations: ['todoLists'] });
  }
}
