import { InputType, ObjectType, PickType } from '@nestjs/graphql';
import { Feed } from '../entities/feed.entity';
import { CoreOutput } from '../../common/dtos/output.dto';

@InputType()
export class CreateFeedInput extends PickType(Feed, [
  'category',
  'title',
  'content',
]) {}

@ObjectType()
export class CreateFeedOutput extends CoreOutput {}
