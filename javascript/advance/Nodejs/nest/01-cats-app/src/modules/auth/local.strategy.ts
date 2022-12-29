import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '../../common';

import { AuthService } from './auth.service';

/**
 * function Strategy(options, verify) {
  if (typeof options == 'function') {
    verify = options;
    options = {};
  }
  if (!verify) { throw new TypeError('LocalStrategy requires a verify callback'); }
  
  this._usernameField = options.usernameField || 'username';
  this._passwordField = options.passwordField || 'password';
  
  passport.Strategy.call(this);
  this.name = 'local';
  this._verify = verify;
  this._passReqToCallback = options.passReqToCallback;
}
 */
@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly authService: AuthService) {
        super({
            usernameField:"username",
            passwordField:"password"
        });
    }

    async validate(username: string, password: string): Promise<any> {
        const user = await this.authService.validateUser(username, password);
        if (!user) {
            throw new UnauthorizedException('Invalid user credentials');
        }
        return user;
    }
}
