import { MigrationInterface, QueryRunner } from "typeorm";

export class Userentitycreated1755766771813 implements MigrationInterface {
    name = 'Userentitycreated1755766771813'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "role"`);
        await queryRunner.query(`CREATE TYPE "public"."users_role_enum" AS ENUM('ADMIN', 'EDITOR', 'CUSTOMER')`);
        await queryRunner.query(`ALTER TABLE "users" ADD "role" "public"."users_role_enum" NOT NULL DEFAULT 'CUSTOMER'`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "isEmailVerified"`);
        await queryRunner.query(`CREATE TYPE "public"."users_isemailverified_enum" AS ENUM('VERIFIED', 'NOT_VERIFIED')`);
        await queryRunner.query(`ALTER TABLE "users" ADD "isEmailVerified" "public"."users_isemailverified_enum" NOT NULL DEFAULT 'NOT_VERIFIED'`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "accountStatus"`);
        await queryRunner.query(`CREATE TYPE "public"."users_accountstatus_enum" AS ENUM('ACTIVE', 'INACTIVE', 'SUSPENDED', 'FROZEN', 'DELETED')`);
        await queryRunner.query(`ALTER TABLE "users" ADD "accountStatus" "public"."users_accountstatus_enum" NOT NULL DEFAULT 'ACTIVE'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "accountStatus"`);
        await queryRunner.query(`DROP TYPE "public"."users_accountstatus_enum"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "accountStatus" character varying`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "isEmailVerified"`);
        await queryRunner.query(`DROP TYPE "public"."users_isemailverified_enum"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "isEmailVerified" character varying`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "role"`);
        await queryRunner.query(`DROP TYPE "public"."users_role_enum"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "role" character varying`);
    }

}
