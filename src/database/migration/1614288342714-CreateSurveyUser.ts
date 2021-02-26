import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateSurveyUser1614288342714 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "surveyUSer",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
          },
          {
            name: "userId",
            type: "uuid",
          },
          {
            name: "surveyId",
            type: "uuid",
          },
          {
            name: "value",
            type: "number",
            isNullable: true,
          },
          {
            name: "created",
            type: "timestamp",
            default: "now()",
          },
        ],
        foreignKeys: [
          {
            name: "FKUser",
            referencedTableName: "user",
            referencedColumnNames: ["id"],
            columnNames: ["userId"],
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
          },
          {
            name: "FKSurvey",
            referencedTableName: "survey",
            referencedColumnNames: ["id"],
            columnNames: ["surveyId"],
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("surveyUSer");
  }
}
