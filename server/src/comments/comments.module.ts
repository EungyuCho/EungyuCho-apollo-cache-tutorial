import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment } from './entities/comment.entity';
import { CommentsResolver } from './comments.resolver';
import { CommentsService } from './comments.service';
import { Feed } from '../feeds/entities/feed.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Comment, Feed])],
  providers: [CommentsResolver, CommentsService],
})
export class CommentsModule {}
