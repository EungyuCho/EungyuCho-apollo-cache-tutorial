import { Field, InputType, ObjectType } from '@nestjs/graphql';
import {
  PaginationInput,
  PaginationOutput,
} from '../../common/dtos/pagination.dto';
import { Feed } from '../entities/feed.entity';

@InputType()
export class AllFeedsInput extends PaginationInput {}

@ObjectType()
export class AllFeedsOutput extends PaginationOutput {
  @Field(type => [Feed], { nullable: true })
  feeds?: Feed[];
}
