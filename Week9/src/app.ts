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
// MONOGODB CONNECTION
// Connect to MongoDB database using mongoose and body-parser
const mongoDB = "mongodb://localhost:27017/advancedWebApplications";
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

app.post("/api/user/register", (req: express.Request, res:express.Response, next: any) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    User.findOne({ username: req.body.username }, (err: Error , user: Object) => {
      if (err) {
        console.log(err);
        throw err;
      }
      if (user) {
        return res.status(403).json({ username: "Username already in use." });
      } else {
        bcrypt.genSalt(10, (err: Error, salt: string) => {
          bcrypt.hash(req.body.password, salt, (err: Error, hash: string) => {
            if (err) throw err;
            User.create(
              {
                username: req.body.username,
                password: hash,
              },
              (err: Error, ok: string) => {
                if (err) throw err;
                return res.redirect("/api/user/login");
              }
            );
          });
        });
      }
    });
  }
);

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
        res.status(403).send("No token provided");
    }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
