import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import {
  CreateCommentInput,
  CreateCommentOutput,
} from './dtos/create-comment.dto';
import { CommentsService } from './comments.service';
import { AuthUser } from '../auth/auth-user.decorator';
import { Role } from '../auth/role.decorator';

@Resolver()
export class CommentsResolver {
  constructor(private commentsService: CommentsService) {}

  @Role(['Any'])
  @Mutation(returns => CreateCommentOutput)
  createComment(
    @AuthUser() user,
    @Args('input') createCommentInput: CreateCommentInput,
  ): Promise<CreateCommentOutput> {
    console.log(user);
    return this.commentsService.createComment(user, createCommentInput);
  }
}
