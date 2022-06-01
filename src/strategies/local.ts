import LocalStrategy from "passport-local";
import bcrypt from "bcrypt";
import userDb from "../dataBase/userDb";
const initialize = (
  passport: any,
  getUserByEmail: Function,
  getUserById: Function
) => {
  const authenticateUser = async (
    email: string,
    password: string,
    done: Function
  ) => {
    const user = await getUserByEmail(email);
    console.log(user);
    if (user == null) {
      console.log("No user with that email");
      return done(null, false, { message: "No user with that email" });
    }

    try {
      if (await bcrypt.compare(password, user.password)) {
        return done(null, user);
      } else {
        return done(null, false, { message: "Password Incorect" });
      }
    } catch (err) {
      return done(err);
    }
  };

  passport.use(
    new LocalStrategy.Strategy(
      { usernameField: "username", passwordField: "password" },
      authenticateUser
    )
  );

  passport.serializeUser((user: any, cb: Function) => {
    cb(null, user.id);
  });

  passport.deserializeUser((id: string, cb: Function) => {
    userDb.findOne({ _id: id }, (err: any, user: any) => {
      const userInformation = {
        id: user?._id,
        username: user?.email,
        nickname: user?.userName
      };
      cb(null, userInformation);
    })
  });
};

export default initialize;
