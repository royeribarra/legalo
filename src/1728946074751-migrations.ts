import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1728946074751 implements MigrationInterface {
    name = 'Migrations1728946074751'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`perfil_model\` (\`id\` int NOT NULL AUTO_INCREMENT, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` timestamp(6) NULL, \`nombre\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`habilidad_model\` (\`id\` int NOT NULL AUTO_INCREMENT, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` timestamp(6) NULL, \`nombre\` varchar(255) NOT NULL, \`descripcion\` varchar(255) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`clientes\` (\`id\` int NOT NULL AUTO_INCREMENT, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` timestamp(6) NULL, \`nombre\` varchar(255) NOT NULL, \`tipo_persona_id\` int NOT NULL, \`razon_social\` varchar(255) NOT NULL, \`persona_contacto\` varchar(255) NOT NULL, \`dni_contacto\` varchar(255) NOT NULL, \`ruc\` varchar(255) NULL, \`industria\` varchar(255) NOT NULL, \`telefono\` varchar(255) NOT NULL, \`direccion\` varchar(255) NOT NULL, \`telefono_contacto\` varchar(255) NULL, \`userId\` int NULL, UNIQUE INDEX \`IDX_3df2b19a8249c9c18df0a8ae67\` (\`dni_contacto\`), UNIQUE INDEX \`REL_35d048470caecb7e09f0336eca\` (\`userId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`aplicacion_model\` (\`id\` int NOT NULL AUTO_INCREMENT, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` timestamp(6) NULL, \`propuesta\` varchar(255) NOT NULL, \`precio_propuesto\` int NOT NULL, \`abogadoId\` int NULL, \`ofertaId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`ofertas\` (\`id\` int NOT NULL AUTO_INCREMENT, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` timestamp(6) NULL, \`descripcion\` varchar(255) NOT NULL, \`titulo\` varchar(255) NOT NULL, \`especializacion_requerida\` varchar(255) NOT NULL, \`estado\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`trabajo_model\` (\`id\` int NOT NULL AUTO_INCREMENT, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` timestamp(6) NULL, \`estado\` int NOT NULL, \`ofertaId\` int NULL, \`abogadoId\` int NOT NULL, \`clienteId\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`abogados\` (\`id\` int NOT NULL AUTO_INCREMENT, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` timestamp(6) NULL, \`nombre\` varchar(255) NOT NULL, \`apellido_paterno\` varchar(255) NOT NULL, \`apellido_materno\` varchar(255) NOT NULL, \`dni\` varchar(255) NOT NULL, \`fecha_nacimiento\` varchar(255) NOT NULL, \`universidad\` varchar(255) NOT NULL, \`grade_academico\` varchar(255) NOT NULL, \`acerca_de\` varchar(255) NOT NULL, \`telefono\` varchar(255) NOT NULL, \`direccion\` varchar(255) NOT NULL, \`especializacion\` varchar(255) NOT NULL, \`industria\` varchar(255) NOT NULL, \`experiencia\` varchar(255) NOT NULL, \`experiencia_anos\` varchar(255) NOT NULL, \`pdf_cv\` varchar(255) NOT NULL, \`userId\` int NULL, UNIQUE INDEX \`REL_cc624fddd75f1678b28d2f42cb\` (\`userId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`user_model\` (\`id\` int NOT NULL AUTO_INCREMENT, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` timestamp(6) NULL, \`username\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`perfilId\` int NULL, \`abogadoId\` int NULL, \`clienteId\` int NULL, UNIQUE INDEX \`IDX_864bd044bba869304084843358\` (\`email\`), UNIQUE INDEX \`REL_6637b95de42801cf1b8ad2c3ff\` (\`perfilId\`), UNIQUE INDEX \`REL_a2822bf64ced298cb8e68fd8da\` (\`abogadoId\`), UNIQUE INDEX \`REL_d8fc46454d713602e455263de7\` (\`clienteId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`ofertas_habilidades_requeridas_habilidad_model\` (\`ofertasId\` int NOT NULL, \`habilidadModelId\` int NOT NULL, INDEX \`IDX_b0c356e4b3094081b1fbe192eb\` (\`ofertasId\`), INDEX \`IDX_c950481527382eda956e186f15\` (\`habilidadModelId\`), PRIMARY KEY (\`ofertasId\`, \`habilidadModelId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`abogados_habilidades_habilidad_model\` (\`abogadosId\` int NOT NULL, \`habilidadModelId\` int NOT NULL, INDEX \`IDX_46ceefe82d57a518ea36bb9c0a\` (\`abogadosId\`), INDEX \`IDX_dad6cc29cd64db65acc6a467de\` (\`habilidadModelId\`), PRIMARY KEY (\`abogadosId\`, \`habilidadModelId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`clientes\` ADD CONSTRAINT \`FK_35d048470caecb7e09f0336ecac\` FOREIGN KEY (\`userId\`) REFERENCES \`user_model\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`aplicacion_model\` ADD CONSTRAINT \`FK_f5cff788a7d44cdebcc09270e16\` FOREIGN KEY (\`abogadoId\`) REFERENCES \`abogados\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`aplicacion_model\` ADD CONSTRAINT \`FK_f98bef982efe7b35334c894195a\` FOREIGN KEY (\`ofertaId\`) REFERENCES \`ofertas\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`trabajo_model\` ADD CONSTRAINT \`FK_5509a7b9f57aae531dd17eafd12\` FOREIGN KEY (\`ofertaId\`) REFERENCES \`ofertas\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`trabajo_model\` ADD CONSTRAINT \`FK_3afead9052b705dfadad9797965\` FOREIGN KEY (\`abogadoId\`) REFERENCES \`abogados\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`trabajo_model\` ADD CONSTRAINT \`FK_95fe4b71df3f4f121120e425a4c\` FOREIGN KEY (\`clienteId\`) REFERENCES \`clientes\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`abogados\` ADD CONSTRAINT \`FK_cc624fddd75f1678b28d2f42cb2\` FOREIGN KEY (\`userId\`) REFERENCES \`user_model\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`user_model\` ADD CONSTRAINT \`FK_6637b95de42801cf1b8ad2c3ffb\` FOREIGN KEY (\`perfilId\`) REFERENCES \`perfil_model\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`user_model\` ADD CONSTRAINT \`FK_a2822bf64ced298cb8e68fd8da3\` FOREIGN KEY (\`abogadoId\`) REFERENCES \`abogados\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`user_model\` ADD CONSTRAINT \`FK_d8fc46454d713602e455263de79\` FOREIGN KEY (\`clienteId\`) REFERENCES \`clientes\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`ofertas_habilidades_requeridas_habilidad_model\` ADD CONSTRAINT \`FK_b0c356e4b3094081b1fbe192ebb\` FOREIGN KEY (\`ofertasId\`) REFERENCES \`ofertas\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`ofertas_habilidades_requeridas_habilidad_model\` ADD CONSTRAINT \`FK_c950481527382eda956e186f155\` FOREIGN KEY (\`habilidadModelId\`) REFERENCES \`habilidad_model\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`abogados_habilidades_habilidad_model\` ADD CONSTRAINT \`FK_46ceefe82d57a518ea36bb9c0a9\` FOREIGN KEY (\`abogadosId\`) REFERENCES \`abogados\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`abogados_habilidades_habilidad_model\` ADD CONSTRAINT \`FK_dad6cc29cd64db65acc6a467de1\` FOREIGN KEY (\`habilidadModelId\`) REFERENCES \`habilidad_model\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`abogados_habilidades_habilidad_model\` DROP FOREIGN KEY \`FK_dad6cc29cd64db65acc6a467de1\``);
        await queryRunner.query(`ALTER TABLE \`abogados_habilidades_habilidad_model\` DROP FOREIGN KEY \`FK_46ceefe82d57a518ea36bb9c0a9\``);
        await queryRunner.query(`ALTER TABLE \`ofertas_habilidades_requeridas_habilidad_model\` DROP FOREIGN KEY \`FK_c950481527382eda956e186f155\``);
        await queryRunner.query(`ALTER TABLE \`ofertas_habilidades_requeridas_habilidad_model\` DROP FOREIGN KEY \`FK_b0c356e4b3094081b1fbe192ebb\``);
        await queryRunner.query(`ALTER TABLE \`user_model\` DROP FOREIGN KEY \`FK_d8fc46454d713602e455263de79\``);
        await queryRunner.query(`ALTER TABLE \`user_model\` DROP FOREIGN KEY \`FK_a2822bf64ced298cb8e68fd8da3\``);
        await queryRunner.query(`ALTER TABLE \`user_model\` DROP FOREIGN KEY \`FK_6637b95de42801cf1b8ad2c3ffb\``);
        await queryRunner.query(`ALTER TABLE \`abogados\` DROP FOREIGN KEY \`FK_cc624fddd75f1678b28d2f42cb2\``);
        await queryRunner.query(`ALTER TABLE \`trabajo_model\` DROP FOREIGN KEY \`FK_95fe4b71df3f4f121120e425a4c\``);
        await queryRunner.query(`ALTER TABLE \`trabajo_model\` DROP FOREIGN KEY \`FK_3afead9052b705dfadad9797965\``);
        await queryRunner.query(`ALTER TABLE \`trabajo_model\` DROP FOREIGN KEY \`FK_5509a7b9f57aae531dd17eafd12\``);
        await queryRunner.query(`ALTER TABLE \`aplicacion_model\` DROP FOREIGN KEY \`FK_f98bef982efe7b35334c894195a\``);
        await queryRunner.query(`ALTER TABLE \`aplicacion_model\` DROP FOREIGN KEY \`FK_f5cff788a7d44cdebcc09270e16\``);
        await queryRunner.query(`ALTER TABLE \`clientes\` DROP FOREIGN KEY \`FK_35d048470caecb7e09f0336ecac\``);
        await queryRunner.query(`DROP INDEX \`IDX_dad6cc29cd64db65acc6a467de\` ON \`abogados_habilidades_habilidad_model\``);
        await queryRunner.query(`DROP INDEX \`IDX_46ceefe82d57a518ea36bb9c0a\` ON \`abogados_habilidades_habilidad_model\``);
        await queryRunner.query(`DROP TABLE \`abogados_habilidades_habilidad_model\``);
        await queryRunner.query(`DROP INDEX \`IDX_c950481527382eda956e186f15\` ON \`ofertas_habilidades_requeridas_habilidad_model\``);
        await queryRunner.query(`DROP INDEX \`IDX_b0c356e4b3094081b1fbe192eb\` ON \`ofertas_habilidades_requeridas_habilidad_model\``);
        await queryRunner.query(`DROP TABLE \`ofertas_habilidades_requeridas_habilidad_model\``);
        await queryRunner.query(`DROP INDEX \`REL_d8fc46454d713602e455263de7\` ON \`user_model\``);
        await queryRunner.query(`DROP INDEX \`REL_a2822bf64ced298cb8e68fd8da\` ON \`user_model\``);
        await queryRunner.query(`DROP INDEX \`REL_6637b95de42801cf1b8ad2c3ff\` ON \`user_model\``);
        await queryRunner.query(`DROP INDEX \`IDX_864bd044bba869304084843358\` ON \`user_model\``);
        await queryRunner.query(`DROP TABLE \`user_model\``);
        await queryRunner.query(`DROP INDEX \`REL_cc624fddd75f1678b28d2f42cb\` ON \`abogados\``);
        await queryRunner.query(`DROP TABLE \`abogados\``);
        await queryRunner.query(`DROP TABLE \`trabajo_model\``);
        await queryRunner.query(`DROP TABLE \`ofertas\``);
        await queryRunner.query(`DROP TABLE \`aplicacion_model\``);
        await queryRunner.query(`DROP INDEX \`REL_35d048470caecb7e09f0336eca\` ON \`clientes\``);
        await queryRunner.query(`DROP INDEX \`IDX_3df2b19a8249c9c18df0a8ae67\` ON \`clientes\``);
        await queryRunner.query(`DROP TABLE \`clientes\``);
        await queryRunner.query(`DROP TABLE \`habilidad_model\``);
        await queryRunner.query(`DROP TABLE \`perfil_model\``);
    }

}
