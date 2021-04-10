import { CoreEntity } from '../../common/entities/core.entity';
import { Column, Entity, ManyToOne, OneToMany, RelationId } from 'typeorm';
import {
  Field,
  InputType,
  Int,
  ObjectType,
  registerEnumType,
} from '@nestjs/graphql';
import { IsEnum, IsString } from 'class-validator';
import { User } from '../../users/entities/user.entity';
import { Comment } from '../../comments/entities/comment.entity';

export enum Category {
  Free = 'Feed',
  Animal = 'Animal',
  Humor = 'Humor',
}

registerEnumType(Category, { name: 'Category' });

@InputType('FeedInputType', { isAbstract: true })
@ObjectType()
@Entity()
export class Feed extends CoreEntity {
  @Column()
  @Field(type => String)
  @IsString()
  title: string;

  @Column()
  @Field(type => String)
  @IsString()
  content: string;

  @Column({ type: 'enum', enum: Category })
  @Field(type => Category)
  @IsEnum(Category)
  category: Category;

  @Field(type => User)
  @ManyToOne(
    type => User,
    user => user.feeds,
    {
      eager: true,
    },
  )
  owner: User;

  @Field(type => [Comment])
  @OneToMany(
    type => Comment,
    comment => comment.feed,
    { eager: true },
  )
  comments: Comment[];
}
