const HttpStatusCodes = require("../../status-codes");
/**
 * Exactly one scope is expected for an service endpoint.
 * @param {*} expectedScope 
 * @returns 
 */


module.exports = (scope) => {
  let expectedScope = scope;
  return (req, res, next) => {
      const jwtScope = req.jwt.claims.scope || '';
      const allowedPermissions = Array.from(jwtScope.split(" "));
      const allowed = allowedPermissions.some((scope)=> scope === expectedScope);
      if(allowed)
        next()
      else {
        res.status(HttpStatusCodes.NOT_AUTHORIZED).send('Unauthorized');
      }
  }
};
