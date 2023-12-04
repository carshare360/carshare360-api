import { MigrationInterface, QueryRunner } from "typeorm"

export class VehicleChangeTableName1701640018694 implements MigrationInterface {
    name = 'VehicleChangeTableName1701640018694'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "vehicle" RENAME TO "vehicles"`)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "vehicles" RENAME TO "vehicle"`)
    }

}
