import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FeedResolver } from './feeds.resolver';
import { Feed } from './entities/feed.entity';
import { FeedsService } from './feeds.service';

@Module({
  imports: [TypeOrmModule.forFeature([Feed])],
  providers: [FeedResolver, FeedsService],
})
export class FeedsModule {}
