import { MigrationInterface, QueryRunner } from "typeorm";

export class PointFieldVehicle1701629468358 implements MigrationInterface {
    name = 'PointFieldVehicle1701629468358'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "vehicle" DROP COLUMN "location"`);
        await queryRunner.query(`ALTER TABLE "vehicle" ADD "location" geography(Point,4326) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "vehicle" DROP COLUMN "location"`);
        await queryRunner.query(`ALTER TABLE "vehicle" ADD "location" integer NOT NULL`);
    }

}
