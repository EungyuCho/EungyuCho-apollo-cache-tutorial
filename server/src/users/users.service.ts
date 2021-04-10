import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import {
  CreateAccountInput,
  CreateAccountOutput,
} from './dtos/create-account.dto';
import { UserProfileOutput } from './dtos/user-profile.dto';
import { JwtService } from '../jwt/jwt.service';
import { LoginInput, LoginOutput } from './dtos/login.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly users: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async createAccount(
    createAccountInput: CreateAccountInput,
  ): Promise<CreateAccountOutput> {
    try {
      const exists = await this.users.findOne({
        email: createAccountInput.email,
      });
      if (exists) {
        return {
          ok: false,
          error: 'This nick is already exists.',
        };
      }

      const user = this.users.create(createAccountInput);

      await this.users.save(user);

      return {
        ok: true,
      };
    } catch (error) {
      console.log(error);
      return {
        ok: false,
        error: 'Could not create account.',
      };
    }
  }

  async login({ email, password }: LoginInput): Promise<LoginOutput> {
    try {
      const user = await this.users.findOne(
        { email },
        { select: ['id', 'password'] },
      );
      if (!user) {
        return {
          ok: false,
          error: 'User not found',
        };
      }

      const passwordCorrect = await user.checkPassword(password);

      if (!passwordCorrect) {
        return {
          ok: false,
          error: 'Wrong password',
        };
      }
      const token = this.jwtService.sign(user.id);

      return {
        ok: true,
        token,
      };
    } catch (error) {
      return {
        ok: false,
        error: 'Could not login',
      };
    }
  }

  async findById(id: number): Promise<UserProfileOutput> {
    try {
      const user = await this.users.findOneOrFail({ id });
      return {
        ok: true,
        user,
      };
    } catch (error) {
      return { ok: false, error: 'User Not Found' };
    }
  }

  async findOne(email: string) {
    const user = await this.users.findOne(
      { email },
      {
        select: ['email', 'nick', 'password'],
      },
    );
    return user;
  }

  async findByEmail(email: string): Promise<User> {
    try {
      const user = await this.users.findOne({ email });

      return user;
    } catch (err) {
      console.log(null);
    }

    return null;
  }

  async profile({ id }: User): Promise<UserProfileOutput> {
    try {
      const user = await this.users.findOne({ id });
      return {
        ok: true,
        user,
      };
    } catch (error) {
      console.log(error);
      return {
        ok: false,
        error: 'Cannot load profile',
      };
    }
  }
}
