require("dotenv").config();
import express from "express";
const createError = require("http-errors");
const path = require("path");
const cookieParser = require("cookie-parser");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const { body, validationResult } = require("express-validator");
const validateToken = require("../auth/validateToken.js");
const app: express.Application = express();
const port: number = 3000;
const mongoDB = "mongodb://localhost:27017/testdb";
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

// Create a schema for the user
const userSchema = new mongoose.Schema({
  email: String,
  password: String,
});
// Create a model for the user
const User = mongoose.model("User", userSchema);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use((req: any, res: any, next: any) => {
  if (
    req.headers &&
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "JWT"
  ) {
    jwt.verify(
      req.headers.authorization.split(" ")[1],
      "REST API",
      (err: any, decode: any) => {
        if (err) req.user = undefined;
        req.user = decode;
        next();
      }
    );
  } else {
    req.user = undefined;
    next();
  }
});

app.get("/", (req: express.Request, res: express.Response) => {
  res.send("Hello World!");
});

app.post("/api/user/register",(req: express.Request, res: express.Response, next: any) => {
    let email = req.body.email;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    User.findOne({ email: email }, (err: Error, user: Object) => {
      if (err) {
        console.log(err);
        throw err;
      }
      if (user) {
        return res.status(403).json({ email: "email already in use." });
      } else {
        let password = req.body.password;
        // Regex expression from https://stackoverflow.com/questions/19605150/regex-for-password-must-contain-at-least-eight-characters-at-least-one-number-a
        let passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[~`!@#$%^&*()-_+={}[\]\\|;:"<>,./?])(?=.{8,})/;

        if (!passwordRegex.test(password)) {
          return res.status(400).json({ password: "Password is not strong enough." });
        } else {
            bcrypt.hashSync(req.body.password, 10);
            let user = new User({ 
                email: req.body.email,
                password: bcrypt.hashSync(req.body.password, 10)
            });
            user.save((err: Error) => {
                if (err) {
                    return next(err);
                } else {
                    res.status(200).json({ success: true, message: "User created" });
                }
            });
        }
        }
    });
});
app.post("/api/user/login/", (req: express.Request, res: express.Response) => {
  let email: string = req.body.email;
  let password: string = req.body.password;
  if (!email || !password) {
    res.send("Please enter an email and password");
  }
  User.findOne({ email: email }, (err: any, user: any) => {
    if (err) {
      console.log(err);
    } else if (!user) {
      res.status(403).send("Email not found");
    } else {
      if (bcrypt.compareSync(password, user.password)) {
        let token = jwt.sign({ email: user.email, _id: user._id }, "REST API", {
          expiresIn: "1h",
        });
        let resultado: any = { success: true, token: token };
        // set the token as a cookie
        res.cookie("token", token, { httpOnly: true }).send(resultado);
      } else {
        res.status(403).send("Incorrect password");
      }
    }
  });
});

app.get("/api/private/", (req: express.Request, res: express.Response) => {
  if (req.cookies.token) {
    jwt.verify(req.cookies.token, "REST API", (err: any, decoded: any) => {
      if (err) {
        res.status(403).send("Invalid token");
      } else {
        res.json({ email: decoded.email });
      }
    });
  } else {
    res.status(401).send("No token provided");
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
