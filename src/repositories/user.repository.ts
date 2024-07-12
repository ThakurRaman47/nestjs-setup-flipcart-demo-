import { Injectable } from "@nestjs/common";
import { createUser } from "src/common/interfaces/user/create.user.interface";
import { updateUser } from "src/common/interfaces/user/update.user.interface";
import { User } from "src/entities/user.entity";
import { DataSource, EntityRepository, Repository } from "typeorm";

@Injectable()
export class UserRepository extends Repository<User> {
    constructor(private dataSource: DataSource) {
        super(User, dataSource.createEntityManager());
    }

    async getUserById(id:string) {
        return await this.findOne({where : {id}})
    }

    async checkUserByEmail(email:string) {
        return await this.findOne({where:{email}})
    }

    async signUpUser(payload: createUser) {
        return await this.save(payload)
    }

    async updateUserWithCondition(condition:any,payload:any) {
        return await this.update(condition,payload)
    }
}