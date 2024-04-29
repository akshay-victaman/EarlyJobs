const jwt = require("jsonwebtoken");

const authenticateToken = (request, response, next) => {
  let jwtToken;
  const authHeaders = request.headers['authorization'];
  if(authHeaders != undefined) {
    jwtToken = authHeaders.split(" ")[1];
  }
  if(jwtToken === undefined) {
    response.status(401);
    response.send({error: "Invalid JWT Token"});
  } else {
    jwt.verify(jwtToken, "jobbyApp", async (error, payload) => {
        if(error) {
            response.status(401);
            response.send({error: "Invalid JWT Token"});
        } else {
            request.email = payload.email;
            next();
        }
    });
  }
};
  
module.exports = authenticateToken;