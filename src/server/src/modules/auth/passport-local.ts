import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import argon from 'argon2';
import { UserService } from '../../services/user.service';
import { Provider } from '../../common/database/tables';

const userService = new UserService();

passport.use(
  'local',
  new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
  }, async (username, password, cb) => {

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
    {
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: true,
    },
    async (req, username, password, done) => {
      const userData = req.body;
      try {
        const hashedPassword = await argon.hash(userData.password);
        const user = await userService.createUser(userData.username, userData.email, Provider.Email, hashedPassword);

        return done(null, user);
      } catch (error) {
        done(error);
      }
    },
  ),
);