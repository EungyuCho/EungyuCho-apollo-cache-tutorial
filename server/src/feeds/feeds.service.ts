import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Feed } from './entities/feed.entity';
import { Repository } from 'typeorm';
import { CreateFeedInput, CreateFeedOutput } from './dtos/create-feed.dto';
import { AllFeedsInput, AllFeedsOutput } from './dtos/all-feed.dto';

@Injectable()
export class FeedsService {
  constructor(
    @InjectRepository(Feed) private readonly feeds: Repository<Feed>,
  ) {}

  async createFeed(
    user,
    createFeedInput: CreateFeedInput,
  ): Promise<CreateFeedOutput> {
    try {
      console.log(user);
      await this.feeds.save(
        this.feeds.create({ owner: user, ...createFeedInput }),
      );
      return {
        ok: true,
      };
    } catch (err) {
      console.log(err);
      return {
        ok: false,
        error: 'Could not create feed',
      };
    }
  }

  async getAllFeeds({ page }: AllFeedsInput): Promise<AllFeedsOutput> {
    try {
      const FEED_TAKES = +process.env.FEED_TAKE;
      console.log(FEED_TAKES);

      const [feeds, totalResults] = await this.feeds.findAndCount({
        take: FEED_TAKES,
        skip: (page - 1) * FEED_TAKES,
        order: {
          createdAt: 'DESC',
        },
      });

      console.log(feeds);

      return {
        ok: true,
        feeds,
        totalResults,
        totalPages: Math.ceil(totalResults / FEED_TAKES),
      };
    } catch (err) {
      console.log(err);
      return {
        ok: false,
        error: 'Could not load feeds',
      };
    }
  }
}
