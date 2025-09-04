import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateMigrations1756959154348 implements MigrationInterface {
    name = 'CreateMigrations1756959154348'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`check_ins\` (\`id\` varchar(36) NOT NULL, \`checkIn\` date NOT NULL, \`habitId\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`habit\` (\`id\` varchar(36) NOT NULL, \`name\` varchar(255) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`userId\` varchar(36) NULL, UNIQUE INDEX \`IDX_e44ce09f56ae9441745f3d112d\` (\`name\`, \`userId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`user\` (\`id\` varchar(36) NOT NULL, \`email\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`name\` varchar(255) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), UNIQUE INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` (\`email\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`check_ins\` ADD CONSTRAINT \`FK_0ddcda4c6874b1910dc565f2550\` FOREIGN KEY (\`habitId\`) REFERENCES \`habit\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`habit\` ADD CONSTRAINT \`FK_999000e9ce7a69128f471f0a3f9\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`habit\` DROP FOREIGN KEY \`FK_999000e9ce7a69128f471f0a3f9\``);
        await queryRunner.query(`ALTER TABLE \`check_ins\` DROP FOREIGN KEY \`FK_0ddcda4c6874b1910dc565f2550\``);
        await queryRunner.query(`DROP INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` ON \`user\``);
        await queryRunner.query(`DROP TABLE \`user\``);
        await queryRunner.query(`DROP INDEX \`IDX_e44ce09f56ae9441745f3d112d\` ON \`habit\``);
        await queryRunner.query(`DROP TABLE \`habit\``);
        await queryRunner.query(`DROP TABLE \`check_ins\``);
    }

}
