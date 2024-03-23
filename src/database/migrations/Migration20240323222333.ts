import { Migration } from '@mikro-orm/migrations';

export class Migration20240323222333 extends Migration {
  public async up(): Promise<void> {
    this.addSql(`
      create table "rooms" (
        "id" serial primary key, 
        "name" varchar(50) not null, 
        "type" text check ("type" in (
          'conference', 
          'meeting', 
          'studio', 
          'lounge', 
          'open_area'
        )) not null, 
        "area" int4 not null, 
        "capacity" int4 not null, 
        "deleted" bool not null default false, 
        "created_at" timestamp not null default current_timestamp, 
        "deleted_at" timestamp not null default current_timestamp, 
        "modified_at" timestamp not null default current_timestamp
      );
    `);

    this.addSql(`
      create table "calendars" (
        "id" serial primary key, 
        "room_id" int not null,
        "created_at" timestamp not null default current_timestamp, 
        "modified_at" timestamp not null default current_timestamp
      ); 
    `);

    this.addSql(`
      alter table "calendars" 
        add constraint "calendars_room_id_foreign" 
        foreign key ("room_id") references "rooms" ("id") 
        on update cascade on delete cascade;
    `);

    this.addSql(`
      alter table "calendars" 
        add constraint "calendars_room_id_unique" 
        unique ("room_id");
    `);

    this.addSql(`
      create table "time_slots" (
        "id" serial primary key, 
        "calendar_id" int not null, 
        "date" date not null, 
        "start_time" time not null, 
        "end_time" time not null, 
        "status" text check ("status" in (
          'available', 
          'reserved', 
          'booked'
        )) not null default 'available', 
        "reserved_at" timestamp not null default current_timestamp, 
        "created_at" timestamp not null default current_timestamp, 
        "modified_at" timestamp not null default current_timestamp
      );
    `);

    this.addSql(`
      alter table "time_slots" 
        add constraint "time_slots_calendar_id_foreign" 
        foreign key ("calendar_id") references "calendars" ("id") 
        on update cascade on delete cascade;
    `);
  }

  public async down(): Promise<void> {
    this.addSql('alter table "rooms" drop constraint "rooms_calendar_id_foreign";');

    this.addSql('alter table "time_slots" drop constraint "time_slots_calendar_id_foreign";');

    this.addSql('drop table if exists "calendars" cascade;');

    this.addSql('drop table if exists "rooms" cascade;');

    this.addSql('drop table if exists "time_slots" cascade;');
  }
}
