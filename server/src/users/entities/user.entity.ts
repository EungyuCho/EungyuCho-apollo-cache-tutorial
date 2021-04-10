import { CoreEntity } from '../../common/entities/core.entity';
import { BeforeInsert, BeforeUpdate, Column, Entity, OneToMany } from 'typeorm';
import {
  Field,
  InputType,
  ObjectType,
  registerEnumType,
} from '@nestjs/graphql';
import { IsEmail, IsEnum, IsString, Min } from 'class-validator';
import { Feed } from '../../feeds/entities/feed.entity';
import { Comment } from '../../comments/entities/comment.entity';
import { InternalServerErrorException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

export enum UserRole {
  USER = 'USER',
  ADMIN = 'ADMIN',
}

registerEnumType(UserRole, { name: 'UserRole' });

@InputType('UserInputType', { isAbstract: true })
@ObjectType()
@Entity()
export class User extends CoreEntity {
  @Column({ unique: true })
  @Field(type => String)
  @IsEmail()
  email: string;

  @Column({ unique: true })
  @Field(type => String)
  @IsString()
  nick: string;

  @Column({ type: 'enum', enum: UserRole })
  @Field(type => UserRole)
  @IsEnum(UserRole)
  role: UserRole;

  @Column({ select: false })
  @Field(type => String)
  @IsString()
  password: string;

  @Field(type => [Feed])
  @OneToMany(
    type => Feed,
    feed => feed.owner,
  )
  feeds: Feed[];

  @Field(type => [Comment])
  @OneToMany(
    type => Comment,
    comment => comment.owner,
  )
  comments: Comment[];

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword(): Promise<void> {
    if (this.password) {
      try {
        this.password = await bcrypt.hash(this.password, 10);
      } catch (e) {
        console.log(e);
        throw new InternalServerErrorException();
      }
    }
  }

  async checkPassword(aPassword: string): Promise<boolean> {
    try {
      const ok = await bcrypt.compare(aPassword, this.password);
      return ok;
    } catch (e) {
      console.log(e);
      throw new InternalServerErrorException();
    }
  }
}
