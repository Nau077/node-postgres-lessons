const config = require("../../../config/auth.config")
const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
    const authHeader  = req.headers["Authorization"];

    if (!authHeader ) {
      return res.status(403).send({
        message: "Токоне не обеспечен"
      });
    }

    const token = authHeader.replace("Bearer", "")
  
    jwt.verify(token, config.refreshToken.salt, (err, decoded) => {
      if (err) {
        return res.status(401).send({
          message: "Неавторизован!"
        });
      }

      if (decoded.accessory == "students") {
        req.accessory = "students";
      }

      next();
    });
  };

const isStudent = (req, res, next) => {
        if (req.accessory !== "students") {
            res.status(403).send({
            message: "Необходимы права студента!"
            });            
        }
        next();
        return;
  };

  const authJwt = {
    verifyToken,
    isStudent
  };

  module.exports = authJwt;

 