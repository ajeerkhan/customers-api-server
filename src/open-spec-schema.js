const CUSTOMER_RETRIEVAL_ROUTE = {
    responses: {
      200: {
        description: 'Successful response',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                header: { 
                    type: 'object',
                       properties: {
                            typ: { type: 'string' },
                            alg: { type: 'string' },
                            kid: { type: 'string' },
                        }
                },
                claims: { 
                    type: 'object',
                       properties: {
                            iss: { type: 'string' },
                            sub: { type: 'string' },
                            aud: { type: 'string' },
                            iat: { type: 'string' },
                            exp: { type: 'string' },
                            scope: { type: 'string' },
                            gty: { type: 'string' },
                            azp: { type: 'string' },
                        }
                },
              }
            }
          }
        }
      }
    }
  };

const CUSTOMER_UPDATE_ROUTE = {
    responses: {
      200: {
        description: 'Successful response',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                header: { 
                    type: 'object',
                       properties: {
                            typ: { type: 'string' },
                            alg: { type: 'string' },
                            kid: { type: 'string' },
                        }
                },
                claims: { 
                    type: 'object',
                       properties: {
                            iss: { type: 'string' },
                            sub: { type: 'string' },
                            aud: { type: 'string' },
                            iat: { type: 'string' },
                            exp: { type: 'string' },
                            scope: { type: 'string' },
                            gty: { type: 'string' },
                            azp: { type: 'string' },
                        }
                },
                updated : {
                    type: 'string'
                }
              }
            }
          }
        }
      }
    }
  };

const OpenSpecSchema = {
    'PUBLIC_ROUTE' : {
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
      },
    'CUSTOMER_RETRIEVAL_ROUTE' : CUSTOMER_RETRIEVAL_ROUTE,
    'CUSTOMER_UPDATE_ROUTE' : CUSTOMER_UPDATE_ROUTE,
}
module.exports = OpenSpecSchema;