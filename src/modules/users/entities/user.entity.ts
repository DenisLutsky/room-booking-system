import { BaseEntity, Entity, OptionalProps, PrimaryKey, PrimaryKeyProp, Property } from '@mikro-orm/core';
import { Nullable } from 'shared/types';

@Entity({ tableName: 'users' })
export class UserEntity extends BaseEntity {
  @PrimaryKey({ name: 'id' })
  public userId!: number;

  @Property({ name: 'email', columnType: 'varchar(320)', unique: true })
  public email!: string;

  @Property({ name: 'password', columnType: 'text' })
  public password!: string;

  @Property({ name: 'super_admin', columnType: 'bool', default: false })
  public superAdmin!: boolean;

  @Property({ name: 'verified', columnType: 'bool', default: false })
  public verified!: boolean;

  @Property({ name: 'deleted', columnType: 'bool', default: false })
  public deleted!: boolean;

  @Property({ name: 'created_at', columnType: 'timestamp', defaultRaw: 'current_timestamp' })
  public createdAt!: Date;

  @Property({
    name: 'modified_at',
    columnType: 'timestamp',
    defaultRaw: 'current_timestamp',
    onUpdate: () => new Date(),
  })
  public modifiedAt!: Date;

  @Property({ name: 'deleted_at', columnType: 'timestamp', nullable: true, default: null })
  public deletedAt!: Nullable<Date>;

  public [OptionalProps]?: 'userId' | 'deleted' | 'createdAt' | 'modifiedAt' | 'deletedAt';

  public [PrimaryKeyProp]?: ['userId'];
}
