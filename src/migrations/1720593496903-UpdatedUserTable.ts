import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdatedUserTable1720593496903 implements MigrationInterface {
    name = 'UpdatedUserTable1720593496903'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "profilePic" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "profilePic" SET NOT NULL`);
    }

}
