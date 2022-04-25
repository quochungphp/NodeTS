import { EntityRepository, Repository } from 'typeorm';
import { UserInterface } from '../interfaces/user.interface';
import { UserEntity } from '../repositories/user.entity';


@EntityRepository()
class UserService extends Repository<UserEntity> {
  public async findAllUser(): Promise<UserInterface[]> {
    const users: UserInterface[] = await UserEntity.find();
    return users;
  }
}


export default UserService;