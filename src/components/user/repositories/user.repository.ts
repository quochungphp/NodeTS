import { getManager, Repository } from "typeorm";
import { UserEntity } from "./user.entity";

export class UserRepository {
    userRepo(): Repository<UserEntity> {
      return  getManager().getRepository(UserEntity);
    }
}