import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateFeedInput, CreateFeedOutput } from './dtos/create-feed.dto';
import { Role } from '../auth/role.decorator';
import { AuthUser } from '../auth/auth-user.decorator';
import { FeedsService } from './feeds.service';
import { AllFeedsInput, AllFeedsOutput } from './dtos/all-feed.dto';

@Resolver()
export class FeedResolver {
  constructor(private readonly feedsService: FeedsService) {}

  @Role(['Any'])
  @Mutation(returns => CreateFeedOutput)
  createFeed(
    @AuthUser() user,
    @Args('input') createFeedInput: CreateFeedInput,
  ): Promise<CreateFeedOutput> {
    return this.feedsService.createFeed(user, createFeedInput);
  }

  @Query(returns => AllFeedsOutput)
  getAllFeeds(
    @Args('input') feedsInput: AllFeedsInput,
  ): Promise<AllFeedsOutput> {
    return this.feedsService.getAllFeeds(feedsInput);
  }
}
