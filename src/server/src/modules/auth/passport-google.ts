import passport from "passport";
import {Strategy as GoogleStrategy, StrategyOptionsWithRequest, VerifyCallback} from "passport-google-oauth2";
import settings from "../../common/settings/settings";
import {Request} from "express";
import {GoogleProfile} from "./passport.types";
import {createSessionUser} from "./createSessionUser";
import {UserService} from "../../services/user.service";
import {SettingsService} from "../../services/settings.service";

const userService = new UserService();
const settingsService = new SettingsService();

const GoogleOptions = {
    clientID: settings.googleClientId,
    clientSecret: settings.googleClientSecret,
    callbackURL: settings.googleCallbackUrl,
    passReqToCallback: true,
}

const GoogleOptionsInternal = {
    ...GoogleOptions,
    callbackURL: '/auth/google/callback/internal',
}

const GoogleCallback = async (
    _req: Request,
    accessToken: string,
    _refreshToken: string,
    profile: GoogleProfile,
    done: VerifyCallback
)=> {
    const isExistingUser = await userService.doesUserExist(profile.email);

    if (!isExistingUser) {
        await userService.createUser(profile.displayName, profile.email);
        await settingsService.createNotificationSettings(profile.email);
    }

    return done(null, createSessionUser(accessToken, profile));
}


passport.use('google', new GoogleStrategy(<StrategyOptionsWithRequest>GoogleOptions, GoogleCallback));

passport.use('google-internal', new GoogleStrategy(<StrategyOptionsWithRequest>GoogleOptionsInternal, GoogleCallback));

passport.serializeUser(function (user: any, done: VerifyCallback) {
    done(null, user);
});

passport.deserializeUser(function (user: any, done: VerifyCallback) {
    done(null, user);
});