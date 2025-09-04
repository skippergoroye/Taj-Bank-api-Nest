import { MigrationInterface, QueryRunner } from "typeorm";

export class Newentitycreated1756996333560 implements MigrationInterface {
    name = 'Newentitycreated1756996333560'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "accounts" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "userId" uuid NOT NULL, "accountNumber" character varying NOT NULL, "balance" numeric(30,2) NOT NULL DEFAULT '0', "type" character varying NOT NULL, "status" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_c57d6a982eeaa1d115687b17b63" UNIQUE ("accountNumber"), CONSTRAINT "PK_5a7a02c20412299d198e097a8fe" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "token" DROP CONSTRAINT "PK_82fae97f905930df5d62a702fc9"`);
        await queryRunner.query(`ALTER TABLE "token" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "token" ADD "id" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "token" ADD CONSTRAINT "PK_82fae97f905930df5d62a702fc9" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "accounts" ADD CONSTRAINT "FK_3aa23c0a6d107393e8b40e3e2a6" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "accounts" DROP CONSTRAINT "FK_3aa23c0a6d107393e8b40e3e2a6"`);
        await queryRunner.query(`ALTER TABLE "token" DROP CONSTRAINT "PK_82fae97f905930df5d62a702fc9"`);
        await queryRunner.query(`ALTER TABLE "token" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "token" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "token" ADD CONSTRAINT "PK_82fae97f905930df5d62a702fc9" PRIMARY KEY ("id")`);
        await queryRunner.query(`DROP TABLE "accounts"`);
    }

}
