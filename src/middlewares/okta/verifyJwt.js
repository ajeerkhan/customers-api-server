const OktaJwtVerifier = require('@okta/jwt-verifier');
const HttpStatusCodes = require("../../status-codes");

module.exports = (function () {
    let oktaJwtVerifier;
    let API_SERVER_AUDIENCE;
    return {
        initJWTVerifier,
        verifyJwt
    };
    function initJWTVerifier(issuer, jwksUri, audience) {
        API_SERVER_AUDIENCE = audience;

        oktaJwtVerifier = new OktaJwtVerifier({
          issuer, 
          jwksUri
      });
    };

    function verifyJwt(req, res, next) {
      const authHeader = req.headers.authorization || '';
      const match = authHeader.match(/Bearer (.+)/);
    
      if (!match) {
        res.status(HttpStatusCodes.NOT_AUTHORIZED).send('Unauthorized');
      }
      else {
      const accessToken = match[1];
      return oktaJwtVerifier.verifyAccessToken(accessToken, API_SERVER_AUDIENCE)
        .then((jwt) => {
          req.jwt = jwt;
          next();
        })
        .catch((err) => {
          res.status(HttpStatusCodes.NOT_AUTHORIZED).send(err.message); //TODO
        });
      }

    };
})();