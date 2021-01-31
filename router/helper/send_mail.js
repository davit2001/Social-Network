const nodemailer = require("nodemailer");
const validator = require("email-validator");

function sendMail(req,res) {
    let txt = Math.floor(Math.random()*10000);
    let email = req.body.email;
    const transport = nodemailer.createTransport({
        service: "Gmail",
        auth: {
            user: "matevosyan20002@gmail.com",
            pass: "ars0220742"
        }
    });

    const mailOptions = {
        from: "ADR network",
        to: email,
        subject: "ADR Registration code",
        text: `Your registration code\`: ${txt}`
    };
    if (validator.validate(email)) {
        transport.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
                res.json({isSend:false,info:`${error}`});
            } else {
                console.log("Email sent: " + info.response);
                res.json({registrationCode:txt,isSend:true,info:"message is sent"});
            }
        });
    }else{
        console.log("mail validation error",validator.validate(email))
        res.json({isSend:false,info:"Email validation error"});
    }
}

module.exports = {
    sendMail,
};