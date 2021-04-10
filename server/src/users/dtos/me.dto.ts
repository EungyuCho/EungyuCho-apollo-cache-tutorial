import { Field, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from '../../common/dtos/output.dto';
import { User } from '../entities/user.entity';

@ObjectType()
export class MeOutput extends CoreOutput {
  @Field(type => User)
  user: User;
}
