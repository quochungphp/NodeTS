import { EntityRepository, Repository } from 'typeorm';
import { Service } from "typedi";
import { InjectRepository } from "typeorm-typedi-extensions";
import { UserInterface } from '../interfaces/user.interface';
import { UserEntity } from '../repositories/user.entity';
import { UserRepository } from "../repositories/user.repository";

@Service()
export class UserService {
  @InjectRepository(UserEntity)
  private userRepository: UserRepository;

  public async findAllUser(): Promise<UserInterface[]> {
    const users: UserInterface[] = await this.userRepository.find();
    return users;
  }
}
