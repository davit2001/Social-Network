const jwt = require('jsonwebtoken');

verifyToken = (req, res, next) => {
  let token = req.cookies["x-access-token"];
  
  if (!token) {
    res.redirect('/login')
    //return res.status(403).send({ message: "No token provided!" });
  } else {
    jwt.verify(token, "esim", (err, decoded) => {
      if (err) {
        return res.status(401).send({ message: "Unauthorized!" });
      }
      req.userObj = decoded;
 //console.log(decoded)
      next();
    });
  }
};
module.exports = {
  verifyToken
}