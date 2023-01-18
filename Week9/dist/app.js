"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const app = express_1.default();
const port = 3000;
// Connect to MongoDB database using mongoose and body-parser 
mongoose.connect("mongodb://localhost:27017/advancedWebApplications", { useNewUrlParser: true, useUnifiedTopology: true });
// Create a schema for the user
const userSchema = new mongoose.Schema({
    email: String,
    password: String
});
// Create a model for the user
const User = mongoose.model("User", userSchema);
// Use body-parser to parse the body of the request
app.use(bodyParser.urlencoded({ extended: true }));
app.get("/", (req, res) => {
    res.send("Hello World!");
});
app.post("/api/user/register/", (req, res) => {
    let email = req.body.user;
    let password = req.body.password;
    let encPass = bcrypt.hashSync(password, 10);
    if (!email || !password) {
        res.send("Please enter an email and password");
    } // Check if the user already exists
    User.findOne({ email: email }, (err, user) => {
        if (err) {
            console.log(err);
        }
        else if (user) {
            res.status(403).send("Email already in use");
        }
    });
    let user = new User({
        email: email,
        password: encPass
    });
    user.save((err) => {
        if (err) {
            console.log(err);
        }
        else {
            res.send("Success");
        }
    });
});
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
//# sourceMappingURL=app.js.map