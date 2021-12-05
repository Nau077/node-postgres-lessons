const config = require("../../../config/auth.config")
const jwt = require("jsonwebtoken");
const { InvalidTokenError, ExpiredTokenError, TokenNotProvidedError, errors } = require("../../utils/error.util");

const verifyToken = (req, res, next) => {
    const authHeader  = req.headers["authorization"];

    if (!authHeader ) {
      return res.status(403).send({
        message: "Токен не обеспечен"
      });
    }
    const token = authHeader.replace("Bearer", "");

    try {
        const payload = jwt.verify(token, config.accessToken.salt);

        if (payload.type !== 'access') {
            throw new InvalidTokenError(errors.get("INVALID_TOKEN"));
        }  

    } catch (e) {
        if (e instanceof jwt.TokenExpiredError) {
            res.status(401).json({ message: 'Token expired!'})
           return;
       } else if (e instanceof jwt.JsonWebTokenError) {
            res.status(401).json({ message: 'Invalid token'})
            return;
        } else {
            const error = new InvalidTokenError(errors.get("INVALID_TOKEN"));
            
            res.send(error);
        }
    }

    next();
  };

const isStudent = (req, res, next) => {
        if (req.body.role !== "students") {
          return res.status(403).send({
            message: "Необходимы права студента!"
            });            
        };

        next();
  };

  const authJwt = {
    verifyToken,
    isStudent
  };

  module.exports = authJwt;

 