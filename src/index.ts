import env from "dotenv";
env.config();
import express from "express";
import session from "express-session";
import cors from "cors";
import mongoose from "mongoose";
import MongoDbStore from "connect-mongo";

import passport from "passport";
import Router from "./routes";
import config from "./config";
import flash from "express-flash";
import expressGraphQL from "express-graphql";
const app = express();
const PORT = 5000;

mongoose.connect("mongodb://localhost/internetoTechnologijos");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const corsSettings = {
  origin: `http://localhost:3000`,

  credentials: false, // set to true
};

app.use(cors(corsSettings));

app.use(flash());
app.use(
  session({
    secret: `${process.env.SESSION_KEY}`,
    cookie: {
      maxAge: 60000 * 60 * 24,
    },
    resave: false,
    saveUninitialized: false,
    store: new MongoDbStore({ mongoUrl: `${config.url.DataBase}` }),
  })
);


app.use(passport.initialize());
app.use(passport.session());

app.use(`/api`, Router);

// app.use('/graphql', expressGraphQL.graphqlHTTP({
//   schema: MyGraphQLSchema,
//   graphiql: true,
// }),)

app.listen(PORT, () =>
  console.log(`Back-end online on: ${PORT}`)
);