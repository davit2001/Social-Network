const signUpController = require("../controller/signup-controller");
const schema = require("../validate/joi");
const User = require("../models/user-schema");
const { hash, checkPassword } = require("./helper/create_hash");
const jwt = require("jsonwebtoken");
const mail = require("./helper/send_mail");

class SignUpRouter {
    async addUser(req, res) {
        console.log(schema.validate(req.body).error)
        if (schema.validate(req.body).error) {
             res.json({ error: schema.validate(req.body).error });
        } else {
            try {
                let data = await User.find({ email: req.body.email });
                if (data.length) {
                    res.json({ info: "Email exsist: try another" });
                } else {
                    let hashPassword = hash(req.body.password);
                    req.body.password = hashPassword;
                    await signUpController.insertUser(req.body);
                    res.json({ result: true });
                }
            } catch (err) {
                console.log("error on checking password: user password " + err);
                res.json(err);
            }
        }
    }
    async loginUser(req, res) {
        let token = req.headers.xaccesstoken;
        if (token === "undefined" || token === "null" || token === undefined || token === null) {
          //  console.log("token isnt sign: normala es ysenc pti ashxati")
        } else {
            try {
                let decoded = jwt.verify(token, "esim");
                if (decoded.email === req.body.login && decoded.password === req.body.password) {
                    return { email: email, token: token, tokenExpiration: 1 };
                }
            } catch (err) {
                console.log("error in verify " + err);
                throw new Error("error on verify token " + err);
            }
        }
        const user = await User.findOne({ login: req.body.login });
        if (!user) {
            res.json({ log: false, info: "Login is incorrect" });
            return false
        }
        let isEqual = await checkPassword(user.password, req.body.password);
        if (!isEqual) {
            res.json({ log: false, info: "Password is incorrect" });
            return false;
        }
        token = jwt.sign({ 
            userId: user._id,
            name:user.name,
            friends:user.friend, 
            email: user.email,
            password: user.password,
            userImg:user.profilePhotos
        }, "esim", {
            expiresIn: "20d",
        });
        res.cookie("x-access-token", token);
        res.json({ userId: user._id,  email: user.email, token: token, tokenExpiration: 1, log: true });
        //res.sendFile(__dirname + "/views/" + "newsfeed.html")
    }
    sendRegistCode(req, res) {
        mail.sendMail(req, res);
    }
}

module.exports = new SignUpRouter();