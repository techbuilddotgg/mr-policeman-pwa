import passport from "passport";
import {ExtractJwt, Strategy as JwtStrategy} from "passport-jwt";
import settings from "../../common/settings/settings";
import {UserService} from "../../services/user.service";

const userService = new UserService();

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