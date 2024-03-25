import { Migration } from '@mikro-orm/migrations';

export class Migration20240325112620 extends Migration {
  public async up(): Promise<void> {
    this.addSql(`
      create table "products" (
        "id" serial primary key, 
        "price" int4 not null, 
        "time_slot_id" int not null, 
        "deleted" bool not null default false, 
        "created_at" timestamp not null default current_timestamp, 
        "modified_at" timestamp not null default current_timestamp, 
        "deleted_at" timestamp null
      );
    `);
    this.addSql(`
      alter table "products" 
      add constraint "products_time_slot_id_unique" unique ("time_slot_id");
    `);

    this.addSql(`
      create table "carts" (
        "id" serial primary key, 
        "total" int4 not null default 0, 
        "user_id" int not null, 
        "active" bool not null default true, 
        "created_at" timestamp not null default current_timestamp, 
        "modified_at" timestamp not null default current_timestamp
      );
    `);
    this.addSql(`
      alter table "carts" 
      add constraint "carts_active_unique" unique ("active");
    `);

    this.addSql(`
      create table "orders" (
        "id" serial primary key, 
        "cart_id" int not null, 
        "status" text check ("status" in (
          'PENDING', 'COMPLETED', 'CANCELLED'
        )) not null default 'PENDING', 
        "created_at" timestamp not null default current_timestamp, 
        "modified_at" timestamp not null default current_timestamp
      );
    `);
    this.addSql(`
      alter table "orders" 
      add constraint "orders_cart_id_unique" unique ("cart_id");
    `);

    this.addSql(`
      create table "invoices" (
        "id" serial primary key, 
        "order_id" int not null, 
        "status" text check ("status" in (
          'PENDING', 'PAID', 'CANCELLED'
        )) not null default 'PENDING', 
        "token" varchar(36) not null, 
        "created_at" timestamp not null default current_timestamp
      );
    `);
    this.addSql(`
      alter table "invoices" 
      add constraint "invoices_order_id_unique" unique ("order_id");
    `);

    this.addSql(`
      create table "cart_products" (
        "cart_id" int not null, 
        "product_id" int not null, 
        constraint "cart_products_pkey" primary key ("cart_id", "product_id")
      );
    `);

    this.addSql(`
      alter table "products" 
        add constraint "products_time_slot_id_foreign" 
        foreign key ("time_slot_id") references "time_slots" ("id") 
        on update cascade;
    `);

    this.addSql(`
      alter table "carts" 
        add constraint "carts_user_id_foreign" 
        foreign key ("user_id") references "users" ("id") 
        on update cascade;
    `);

    this.addSql(`
      alter table "orders" 
        add constraint "orders_cart_id_foreign" 
        foreign key ("cart_id") references "carts" ("id") 
        on update cascade;
    `);

    this.addSql(`
      alter table "invoices" 
        add constraint "invoices_order_id_foreign" 
        foreign key ("order_id") references "orders" ("id") 
        on update cascade;
    `);

    this.addSql(`
      alter table "cart_products" 
      add constraint "cart_products_cart_id_foreign" 
      foreign key ("cart_id") references "carts" ("id") 
      on update cascade on delete cascade;
    `);
    this.addSql(`
      alter table "cart_products" add constraint "cart_products_product_id_foreign" 
        foreign key ("product_id") references "products" ("id") 
        on update cascade on delete cascade;
    `);
  }

  public async down(): Promise<void> {
    this.addSql('alter table "cart_products" drop constraint "cart_products_product_id_foreign";');

    this.addSql('alter table "orders" drop constraint "orders_cart_id_foreign";');

    this.addSql('alter table "cart_products" drop constraint "cart_products_cart_id_foreign";');

    this.addSql('alter table "invoices" drop constraint "invoices_order_id_foreign";');

    this.addSql('drop table if exists "products" cascade;');

    this.addSql('drop table if exists "carts" cascade;');

    this.addSql('drop table if exists "orders" cascade;');

    this.addSql('drop table if exists "invoices" cascade;');

    this.addSql('drop table if exists "cart_products" cascade;');
  }
}
