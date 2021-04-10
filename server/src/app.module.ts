import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { FeedsModule } from './feeds/feeds.module';
import { CommentsModule } from './comments/comments.module';
import { GraphQLModule } from '@nestjs/graphql';
import { CommonModule } from './common/common.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/entities/user.entity';
import { Feed } from './feeds/entities/feed.entity';
import { Comment } from './comments/entities/comment.entity';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from './jwt/jwt.module';
import * as Joi from 'joi';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
      validationSchema: Joi.object({
        JWT_SECRET: Joi.string()
          .valid()
          .required(),
        DB_HOST: Joi.string()
          .valid()
          .required(),
        DB_PORT: Joi.string()
          .valid()
          .required(),
        DB_USERNAME: Joi.string()
          .valid()
          .required(),
        DB_PASSWORD: Joi.string()
          .valid()
          .required(),
        DB_DATABASE: Joi.string()
          .valid()
          .required(),
      }),
    }),
    GraphQLModule.forRoot({
      autoSchemaFile: true,
      context: ({ req, connection }) => {
        const TOKEN_KEY = 'x-jwt';
        if (req) {
          return { token: req.headers[TOKEN_KEY] };
        } else if (connection) {
          return { token: connection.context[TOKEN_KEY] };
        }
      },
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      logging: true,
      synchronize: true,
      entities: [User, Feed, Comment],
    }),
    UsersModule,
    FeedsModule,
    CommentsModule,
    CommonModule,
    AuthModule,
    JwtModule.forRoot({
      accessTokenPrivateKey: process.env.JWT_SECRET,
      accessTokenExpire: +process.env.JWT_ACCESS_TOKEN_EXPIRE,
    }),
  ],
})
export class AppModule {}
