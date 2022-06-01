import express from "express";
import config from "../config";
import bcrypt from "bcrypt";
import userDb from "../dataBase/userDb";
import passport from "passport";
import initializePassport from "../strategies/local";

const router = express.Router();

initializePassport(
  passport,
  async (email: string) => {
    return await userDb.findOne({ email });
  },
  async (id: string) => {
    console.log(id);
    return await userDb.findOne({ _id: id });
  }
);

router.post("/login", (req: any , res: any, next: Function) => {
    passport.authenticate("local", (err, user, info) => {
      if (err) throw err;
      if (!user) res.status(404).send(info);
      else {
        req.logIn(user, (err: any) => {
          if (err) throw err;
          res.status(200).send("Successfully Authenticated");
          console.log(req.user);
        });
      }
    })(req, res, next)});
  
  router.get("/redirect", (req: any, res: any) => {
    res.redirect(`http://localhost:3000/`);
  });
  
  router.get("/failed", (req: any, res: any) => {
    res.redirect(`http://localhost:3000/login`);
  });
  
  router.post("/register", async (req: any, res: any) => {
    try {
      console.log("Register")
      const { password, userName, email } = req.body;
      console.log(req.body);
      const hashedPassword = await bcrypt.hash(password, 10);
      const createUser = await userDb.create({
        userName,
        password: hashedPassword,
        email,
      });
      console.log(createUser);
      res.status(200).send(createUser);
    } catch (err) {
      console.log(err);
      res.status(500).send({ err, message: "Failed" });
    }
  });
  
  router.get("/logout", (req: any, res: any) => {
    if (req.user) {
      console.log(`LOGED OUT`);
      req.session.destroy();
      res.status(200).send({msg: "logedOut"})
    } else {
      res.status(404).send({msg: "unAuthorized"})
    }
  });
  
  router.get("/user", async (req: any, res: any) => {
    if (req.user) {
      res.status(200).send(await req.user);
    } else {
      res.status(404).send({err: "unAuthorized"});
    }
  });
  
  export default router;