import { InputType, ObjectType, PickType } from '@nestjs/graphql';
import { CoreOutput } from '../../common/dtos/output.dto';
import { Comment } from '../entities/comment.entity';

@InputType()
export class CreateCommentInput extends PickType(Comment, [
  'feedId',
  'content',
]) {}

@ObjectType()
export class CreateCommentOutput extends CoreOutput {}
