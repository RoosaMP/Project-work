const jwt = require('jsonwebtoken');
const webTokenSecret = "7b73853bbf076a6cd9fb3e89b5c3b67fccc6f5d819cbae42d7996ea9ec73b7be7d0f00";

const adminAuth = (req, res, next) => {
    const token = req.cookies.jwt;
    if (token) {
      jwt.verify(token, jwtSecret, (err, decodedToken) => {
        if (err)
        {
          console.log("Not authorized");
        }
        else
        {
          console.log('Cookie found');
          next();
          }
        })
      }
      else {
          console.log("Not authorized");
    }
  }