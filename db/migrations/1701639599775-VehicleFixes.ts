import { MigrationInterface, QueryRunner } from "typeorm";

export class VehicleFixes1701639599775 implements MigrationInterface {
    name = 'VehicleFixes1701639599775'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "vehicle" DROP COLUMN "year"`);
        await queryRunner.query(`ALTER TABLE "vehicle" ADD "year" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "vehicle" DROP COLUMN "transmissionType"`);
        await queryRunner.query(`ALTER TABLE "vehicle" ADD "transmissionType" "public"."vehicle_transmissiontype_enum" NOT NULL`);
        await queryRunner.query(`ALTER TABLE "vehicle" DROP COLUMN "mileage"`);
        await queryRunner.query(`ALTER TABLE "vehicle" ADD "mileage" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "vehicle" DROP COLUMN "pricePerHour"`);
        await queryRunner.query(`ALTER TABLE "vehicle" ADD "pricePerHour" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "vehicle" ALTER COLUMN "isAvailable" SET DEFAULT true`);
        await queryRunner.query(`ALTER TABLE "vehicle" ADD CONSTRAINT "CHK_d69f9e6717c3f9a20e298065f6" CHECK ("year" > 1900 AND "year" <= EXTRACT(YEAR FROM CURRENT_DATE) + 1)`);
        await queryRunner.query(`ALTER TABLE "vehicle" ADD CONSTRAINT "CHK_656f7d7588b0ce5a36864f3805" CHECK ("mileage" >= 0)`);
        await queryRunner.query(`ALTER TABLE "vehicle" ADD CONSTRAINT "CHK_3d36e6ae552efe3951124a1e31" CHECK ("pricePerHour" >= 0)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "vehicle" DROP CONSTRAINT "CHK_3d36e6ae552efe3951124a1e31"`);
        await queryRunner.query(`ALTER TABLE "vehicle" DROP CONSTRAINT "CHK_656f7d7588b0ce5a36864f3805"`);
        await queryRunner.query(`ALTER TABLE "vehicle" DROP CONSTRAINT "CHK_d69f9e6717c3f9a20e298065f6"`);
        await queryRunner.query(`ALTER TABLE "vehicle" ALTER COLUMN "isAvailable" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "vehicle" DROP COLUMN "pricePerHour"`);
        await queryRunner.query(`ALTER TABLE "vehicle" ADD "pricePerHour" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "vehicle" DROP COLUMN "mileage"`);
        await queryRunner.query(`ALTER TABLE "vehicle" ADD "mileage" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "vehicle" DROP COLUMN "transmissionType"`);
        await queryRunner.query(`ALTER TABLE "vehicle" ADD "transmissionType" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "vehicle" DROP COLUMN "year"`);
        await queryRunner.query(`ALTER TABLE "vehicle" ADD "year" character varying NOT NULL`);
    }

}
