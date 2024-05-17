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
import { SettingsService } from '../../services/settings.service';
import {Strategy as LocalStrategy} from 'passport-local';
import argon from 'argon2';
import {Strategy as JwtStrategy, ExtractJwt} from 'passport-jwt';
const userService = new UserService();
const settingsService = new SettingsService();

passport.use(
    'google',
  new GoogleStrategy(
    {
      clientID: settings.googleClientId,
      clientSecret: settings.googleClientSecret,
      callbackURL: settings.googleCallbackUrl,
      passReqToCallback: true,
    },
    async function (
      _req: Request,
      accessToken: string,
      _refreshToken: string,
      profile: GoogleProfile,
      done: VerifyCallback
    ) {
      const isExistingUser = await userService.doesUserExist(profile.email);

      if (!isExistingUser) {
        await userService.createUser(profile.displayName, profile.email);
        await settingsService.createNotificationSettings(profile.email);
      }

      return done(null, createSessionUser(accessToken, profile));
    }
  )
);

passport.use(
    'local',
    new LocalStrategy(async (username, password, cb) => {
    const user = await userService.getUserByEmail(username);
    if (!user || !user.password) {
        return cb(null, false, { message: 'Incorrect username or password.' });
    }
    const isPasswordValid = await argon.verify(user.password, password);

    if (!isPasswordValid) {
        return cb(null, false, { message: 'Incorrect email or password.' });
    }

    return cb(null, user);

}));

passport.use(
    'signup',
    new LocalStrategy(
        async (username, password, done) => {
            try {
                const hashedPassword = await argon.hash(password);
                const user = await userService.createUser(username, username, hashedPassword);

                return done(null, user);
            } catch (error) {
                done(error);
            }
        }
    )
);

passport.use(
    'jwt',
    new JwtStrategy(
        {
            secretOrKey: settings.jwtSecret,
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        },
        async (token, done) => {
            try {
                const user = await userService.getUserByEmail(token.user.email);
                return done(null, user);
            }
            catch (error) {
                done(error);
            }
        }
    )
);

passport.serializeUser(function (user: any, done: VerifyCallback) {
  done(null, user);
});

passport.deserializeUser(function (user: any, done: VerifyCallback) {
  done(null, user);
});

