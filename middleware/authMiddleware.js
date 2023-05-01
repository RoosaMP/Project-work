const jwt = require('jsonwebtoken');
const jwtSecretToken = process.env.WEBTOKEN;

const adminAuth = (req, res, next) => {
    const token = req.cookies.jwt; //Haetaan jwt-cookie token muuttujaan
    if (token) { //Onko cookieta olemassa
      jwt.verify(token, jwtSecretToken, (err, decodedToken) => {
        if (err)
        {
          console.log(err.messsage);
          res.render('login', 
          { 
              pagetitle : "Login to adminpage",
              errormessage : "Not signed in as an admin."
          });
        }
        else
        {
          next();
          }
        })
      }
    else {
        res.render('login', 
        { 
            pagetitle : "Login to adminpage",
            errormessage : "Not signed in as an admin."
        });
    }
  }
  module.exports = { adminAuth };