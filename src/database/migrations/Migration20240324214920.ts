import { Migration } from '@mikro-orm/migrations';

export class Migration20240324214920 extends Migration {
  public async up(): Promise<void> {
    this.addSql('alter table "users" alter column "deleted_at" type timestamp using ("deleted_at"::timestamp);');
    this.addSql('alter table "users" alter column "deleted_at" set default null;');
    this.addSql('alter table "users" alter column "deleted_at" drop not null;');

    this.addSql(`
      update "users"
        set "deleted_at" = null
        where "deleted" = false;
    `);
  }

  public async down(): Promise<void> {
    this.addSql('alter table "users" alter column "deleted_at" type timestamp(6) using ("deleted_at"::timestamp(6));');
    this.addSql('alter table "users" alter column "deleted_at" set default CURRENT_TIMESTAMP;');

    this.addSql(`
      update "users"
        set "deleted_at" = '1970-01-01T00:00:00.000'
        where "deleted" = false;
    `);

    this.addSql('alter table "users" alter column "deleted_at" set not null;');
  }
}
