import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdatedUsers1720593616099 implements MigrationInterface {
    name = 'UpdatedUsers1720593616099'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "lastLogin" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "lastLogin" SET NOT NULL`);
    }

}
