import passport from "passport";
import {Strategy as LocalStrategy} from "passport-local";
import argon from "argon2";
import {UserService} from "../../services/user.service";
import {Provider} from "../../common/database/tables";

const userService = new UserService();

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
                const user = await userService.createUser(username, username, Provider.Email, hashedPassword);

                return done(null, user);
            } catch (error) {
                done(error);
            }
        }
    )
);