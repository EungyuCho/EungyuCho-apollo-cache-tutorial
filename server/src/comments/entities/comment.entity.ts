import { CoreEntity } from '../../common/entities/core.entity';
import { Column, Entity, ManyToOne, OneToMany, RelationId } from 'typeorm';
import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { IsString } from 'class-validator';
import { User } from '../../users/entities/user.entity';
import { Feed } from '../../feeds/entities/feed.entity';

@InputType('CommentInputType', { isAbstract: true })
@ObjectType()
@Entity()
export class Comment extends CoreEntity {
  @Column()
  @Field(type => String)
  @IsString()
  content: string;

  @Field(type => Feed)
  @ManyToOne(
    type => Feed,
    feed => feed.comments,
    {
      nullable: true,
      onDelete: 'SET NULL',
    },
  )
  feed: Feed;

  @Field(type => User)
  @ManyToOne(
    type => User,
    user => user.comments,
    {
      eager: true,
      nullable: true,
      onDelete: 'SET NULL',
    },
  )
  owner: User;

  @Field(type => Int)
  @RelationId((comment: Comment) => comment.feed)
  feedId: number;
}
