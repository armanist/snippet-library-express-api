import type { MigrationInterface, QueryRunner } from "typeorm";

export class CreateSnippets1790523429954 implements MigrationInterface {
    name = 'CreateSnippets1790523429954'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "snippets" ("id" text PRIMARY KEY NOT NULL, "title" varchar NOT NULL, "language" text NOT NULL, "code" varchar NOT NULL, "tags" text NOT NULL, "createdAt" datetime NOT NULL DEFAULT (datetime('now')))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "snippets"`);
    }

}
