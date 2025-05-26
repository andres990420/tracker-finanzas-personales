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
    async function (email: string, password: string, done: CallableFunction) {
      const user = await UserModel.findOne({ email });

      if (!user) {
        return done(null, false, { message: "Usuario o Contraseña no econtrado" });
      }

      const isMatch = await userSchemaDB.methods.matchPassword(
        String(password),
        user?.password
      );
      if (isMatch) {
        return done(null, user);
      } else {
        return done(null, false, { message: "Usuario o Contraseña no econtrado" });
      }
    }
  )
);

passport.serializeUser((user: any, done: CallableFunction) => {
  done(null, user.id);
});

passport.deserializeUser(async function (id, done) {
  try {
    const user = await UserModel.findById(id);
    if(!user){
      return (done(new Error('User not found')))
    }
    done(null, user.id)
  } catch (error) {
    done(error);
  }
});
