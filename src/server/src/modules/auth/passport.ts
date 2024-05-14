import { Request } from 'express';
import passport from 'passport';
import {
  Strategy as GoogleStrategy,
  VerifyCallback,
} from 'passport-google-oauth2';
import settings from '../../common/settings/settings';
import { GoogleProfile } from './passport.types';
import { createSessionUser } from './createSessionUser';
import { UserService } from '../../services/user.service';

const userService = new UserService();

passport.use(
  new GoogleStrategy(
    {
      clientID: settings.googleClientId,
      clientSecret: settings.googleClientSecret,
      callbackURL: settings.googleCallbackUrl,
      passReqToCallback: true,
    },
    async function (
      req: Request,
      accessToken: string,
      refreshToken: string,
      profile: GoogleProfile,
      done: VerifyCallback
    ) {
      const isExistingUser = await userService.doesUserExist(profile.email);

      if (!isExistingUser) {
        await userService.createUser(profile.displayName, profile.email);
      }

      return done(null, createSessionUser(accessToken, profile));
    }
  )
);

passport.serializeUser(function (user: any, done: VerifyCallback) {
  done(null, user);
});

passport.deserializeUser(function (user: any, done: VerifyCallback) {
  done(null, user);
});