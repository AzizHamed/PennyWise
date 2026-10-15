import { Injectable } from '@nestjs/common';
import {
  AuthenticationRegistry,
  SessionCookieProvider,
  type SessionRecord,
} from '@nestjs/authentication';
import { User } from '../user/User.js';
import { UserService } from '../user/user.service.js';

@Injectable()
export class SessionAuthProvider extends SessionCookieProvider<User> {
  constructor(
    private readonly userService: UserService,
    registry: AuthenticationRegistry,
  ) {
    super();
    registry.registerProvider(this);
  }

  protected validate(session: SessionRecord) {
    return this.userService.findById(session.userId);
  }
}