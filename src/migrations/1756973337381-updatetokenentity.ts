import { MigrationInterface, QueryRunner } from 'typeorm';

export class Updatetokenentity1756973337381 implements MigrationInterface {
  name = 'Updatetokenentity1756973337381';

  public async up(queryRunner: QueryRunner): Promise<void> {
    // drop old "used" column if it exists
    await queryRunner.query(`ALTER TABLE "token" DROP COLUMN IF EXISTS "used"`);

    // add "type" column
    await queryRunner.query(
      `ALTER TABLE "token" ADD "type" character varying NOT NULL DEFAULT 'FORGOT_PASSWORD'`,
    );

    // add "status" column
    await queryRunner.query(
      `ALTER TABLE "token" ADD "status" character varying NOT NULL DEFAULT 'NOTUSED'`,
    );

    // step 1: add "expires" as nullable
    await queryRunner.query(
      `ALTER TABLE "token" ADD "expires" TIMESTAMP`,
    );

    // step 2: backfill existing rows with default expiry (e.g., 30 minutes from now)
    await queryRunner.query(
      `UPDATE "token" SET "expires" = now() + interval '30 minutes' WHERE "expires" IS NULL`,
    );

    // step 3: enforce NOT NULL constraint
    await queryRunner.query(
      `ALTER TABLE "token" ALTER COLUMN "expires" SET NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "token" DROP COLUMN "expires"`);
    await queryRunner.query(`ALTER TABLE "token" DROP COLUMN "status"`);
    await queryRunner.query(`ALTER TABLE "token" DROP COLUMN "type"`);
    await queryRunner.query(
      `ALTER TABLE "token" ADD "used" boolean NOT NULL DEFAULT false`,
    );
  }
}
