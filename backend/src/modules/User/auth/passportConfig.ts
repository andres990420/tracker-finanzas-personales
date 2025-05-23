import passport from "passport";
import LocalStrategy from "passport-local";
import UserModel, {
  type IUserModel,
  userSchemaDB,
} from "../model/userModel.ts";

passport.use(
  new LocalStrategy.Strategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async function authUser(
      email: string,
      password: string,
      done: CallableFunction
    ) {
      console.log(email);
      if (!(await UserModel.findOne({ email }))) {
        return done(null, false, { message: "Usuario no econtrado" });
      }

      const user = await UserModel.findOne({ email });

      const isMatch = await userSchemaDB.methods.matchPassword(
        password,
        user?.password
      );
      if (isMatch) {
        return done(null, user);
      } else {
        return done(null, false, { message: "Contraseña incocorrecta" });
      }
    }
  )
);

passport.serializeUser((user: Express.User, done: CallableFunction) => {
  done(null, user);
});

passport.deserializeUser((user: Express.User, done: CallableFunction) => {
  process.nextTick(() => {
    return done(null, user);
  });
});
