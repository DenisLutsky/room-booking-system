import { Migration } from '@mikro-orm/migrations';

export class Migration20240309163045 extends Migration {
  public async up(): Promise<void> {
    this.addSql(`
      create table "users" (
        "id" serial primary key, 
        "email" varchar(320) not null, 
        "password" text not null, 
        "super_admin" bool not null default false, 
        "verified" bool not null default false, 
        "deleted" bool not null default false, 
        "created_at" timestamp not null default current_timestamp, 
        "deleted_at" timestamp not null default current_timestamp, 
        "modified_at" timestamp not null default current_timestamp);
    `);

    this.addSql(`
      alter table "users" 
        add constraint "users_email_unique" unique ("email");
    `);
  }

  public async down(): Promise<void> {
    this.addSql('drop table if exists "users" cascade;');
  }
}
