
const openapi = require('@wesleytodd/openapi')

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
//const { header, body, validationResult } = require('express-validator');
const HttpStatusCodes = require("./status-codes");
const OpenSpecSchema = require('./open-spec-schema');

require('dotenv').config();

const OktaJwtVerifier = require('./middlewares/okta/verifyJwt');
OktaJwtVerifier.initJWTVerifier(process.env.ISSUER_URL, process.env.JWKS_URI ,process.env.API_SERVER_AUDIENCE);
const verifyJwt = OktaJwtVerifier.verifyJwt;

const verifyAccess = require('./middlewares/okta/verifyAccess');

const app = express();

const oapi = openapi({
    openapi: '3.0.0',
    info: {
      title: 'Customer API Access Management',
      description: 'OpenAPI specs for Customer API Access Management',
      version: '1.0.0',
    }
  })

app.use(oapi)
app.use('/swaggerui', oapi.swaggerui());

app.use(cors({
    origin: process.env.CORS_ORIGIN
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());


//Public Echo API
app.get('/', oapi.path({
    responses: {
      200: {
        description: 'Successful response',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                message: { type: 'string' }
              }
            }
          }
        }
      }
    }
  }) ,(req, res)=>{
    res.status(HttpStatusCodes.OK).json({
        message: process.env.THANK_YOU_MESSAGE
    });
});

//Retrieve Customer
app.get('/customer',oapi.path(OpenSpecSchema.CUSTOMER_RETRIEVAL_ROUTE), verifyJwt, verifyAccess(process.env.SCOPE_READ || 'customer:read'), (req, res)=>{
    res.status(HttpStatusCodes.OK).json(req.jwt);
});

//Update customer profile
app.patch('/customer', oapi.path(OpenSpecSchema.CUSTOMER_UPDATE_ROUTE), verifyJwt, verifyAccess(process.env.SCOPE_WRITE || 'customer:write'), (req, res)=>{
    res.status(HttpStatusCodes.OK).json({
        ...req.jwt,
        'updated': true
    });
});

//Global Error Handler
app.use((err, req, res, next)=>{
    res.set(err.headers).status(err.status || HttpStatusCodes.INTERNAL_SERVER_ERROR).json({message: err.mesage})
});

const port = process.env.PORT || 8080;
app.listen(port, ()=>{
    console.log(`Express Server started! at ${port}`);
});

module.exports = app;