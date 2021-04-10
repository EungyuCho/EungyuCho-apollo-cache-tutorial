import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from './entities/comment.entity';
import { User } from '../users/entities/user.entity';
import {
  CreateCommentInput,
  CreateCommentOutput,
} from './dtos/create-comment.dto';
import { Feed } from '../feeds/entities/feed.entity';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private readonly comments: Repository<Comment>,
    @InjectRepository(Feed) private readonly feeds: Repository<Feed>,
  ) {}

  async createComment(
    user: User,
    { content, feedId }: CreateCommentInput,
  ): Promise<CreateCommentOutput> {
    try {
      const feed = await this.feeds.findOne({
        where: {
          id: feedId,
        },
      });

      console.log(feed);
      if (!feed) {
        return {
          ok: false,
          error: 'Cannot find current feed.',
        };
      }

      const comment = this.comments.create({ owner: user, feed, content });
      console.log(comment);
      await this.comments.save(comment);
      return {
        ok: true,
      };
    } catch (err) {
      console.log(err);
      return {
        ok: false,
        error: 'Could not create comment',
      };
    }
    return Promise.resolve(undefined);
  }
}
