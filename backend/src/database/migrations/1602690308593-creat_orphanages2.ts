import {MigrationInterface, QueryRunner,Table} from "typeorm";

export class creatOrphanages21602690308593 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.createTable(new Table({
      name:'orphanages',
      columns:[
        {
          name:'id',
          type:'integer',
          unsigned:true,
          isPrimary:true,
          isGenerated:true,
          generationStrategy:'increment'
        },
        {
          name:'name',
          type:'varchar',
        },
        {
          name:'opening_hours',
          type:'varchar',
        },
        {
          name:'latitude',
          type:'decimal',
          scale:10,
          precision:2
        },          {
          name:'longetude',
          type:'decimal',
          scale:10,
          precision:2
        },
        {
          name:'about',
          type:'text'
        },
        {
          name:'instructions',
          type:'text'
        },
        {
          name:'open_weekends',
          type:"boolean",
          default:false
        }
      ],
    }));    
  }
  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("orphanages");
  }
}
