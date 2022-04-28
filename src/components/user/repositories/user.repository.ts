import { EntityRepository, getManager, Repository } from "typeorm";
import { UserEntity } from "./user.entity";

@EntityRepository(UserEntity)
export class UserRepository extends Repository<UserEntity> {
  userRepo(): Repository<UserEntity> {
    return getManager().getRepository(UserEntity);
  }
}
