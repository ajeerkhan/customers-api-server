Customer Management API service is developed in nodejs [nodejs](https://nodejs.org/en), express [express.js](https://expressjs.com/) web framework.

## Getting Started

### Pre-requisuites

Firstly, check whether NODE & NPM has been installed in your system by running below command in command/terminal window.

```bash
node -v 
npm -v

If not installed yet, install it from [Node](https://nodejs.org/en/download/).

```


### Download the applicaation
Next step is to download the project into your local system from Git repo.

#### a. Create a folder in your local system to download the project.
  
#### b. Go into the project folder and download the project.
 ##### i. Run below command to download the projects into your local system.
    git clone https://github.com/ajeerkhan/vercel-customer-deployment.git 
        
#### c. Go into the project folder downloaded.

### Install Dependencies

Next step is, to install the dependent npm packages of the project by running the below command in command/terminal window.

```bash
npm i or npm install
# or
yarn i or yarn install

```
```
Note: All above step is necessary to run the application.
```
### Ready for running application

To start the application in local system, run commands as below from the project folder.  
```bash
npm run start
# or
yarn run start

The application will start on http://localhost:8080
```

 ##### Browsing Application
 The Customer API Management application exposes 3 different service endpoints,

To access the public endpoint, browser below url.  
```bash
 http://localhost:8080

```
To access the Secured endpoint, browser below url.  
```bash
 http://localhost:8080/customer

```

# About Application
The service application is developed to demonstrate how can secure an application endpoint from unauthorized access with the help of Authoroization server(auth0.com).

Basically the service exposes 3 service endpoints as below.

### Public Service Endpoint
### An secured endpoint which is accessible only for the client who has access to 'customer:read' scope permission.
### Another secured endpoint which is accessible only for the client who has access to 'customer:write' scope permission.

To access the public endpoint, browser below url.  
```bash
 http://localhost:8080

```
To access the Secured endpoint, browser below url.  
```bash
 http://localhost:8080/customer

```

To access the third endpoint, browser below url.  
```bash
 [PATCH] http://localhost:8080/customer

```


The application folders are 

#### SRC
This folder holds the entire source code of the projects.

#### Test
This folder holds the test cases for the project files.

#### Environment Variable
It supports, and capable of reading the configuration from the environment variables.

```bash
 .env 

```

#### Folder Structure
The image shows the application folder structure.
![alt text](image.png)

# Application / System Capabilities
#### ExpressJs
The application is built in a node based popular web framework expressJS.

The project is structured well, folders are organised as per industry standards, and best practices.

#### Nodejs Opensource projects
The application uses below node packages for achieving the functionalities.

```bash
 "@okta/jwt-verifier": "^4.0.1",
    "@wesleytodd/openapi": "^1.1.0",
    "body-parser": "^1.20.2",
    "cors": "^2.8.5",
    "dotenv": "^16.4.5",
    "express": "^4.19.2",
    "express-validator": "^7.2.0"

```

### Engineering Practices 

The application is designed considering the engineering best practices and guidelines.

#### Modular, Clean, Reusable Code
The industry standard engineering best practices are followed, and organised the folders as below.

![alt text](<Screenshot 2024-09-06 at 8.16.29 PM.png>)

#### Middlewards
The middleware are written to authenticate, and authorize the request. It validate and verify the bearer token passed as authorization header, and allow only it user is having access rights for the endpoints.

It would respond with proper HTTP status code, and respective messages otherwise. The minimal setof code as below are being used.

```bash
     'OK' : 200,
     'BAD_REQUEST' : 400,
     'NOT_AUTHORIZED' : 401,
     'NOT_FOUND' : 404,
     'INTERNAL_SERVER_ERROR' : 500,
     'SERVICE_NOT_AVAILABLE' : 503,

```

#### Quality
It supports automation of unit and integration testing.

#### Swagger Open Spec 
It has the capability of generating the API specs based on OpenSpec 3.0, Open spec for the all 3 endpoints are exposed as 

```bash
 http://localhost:8080/swaggerui/ 
```

![alt text](image-1.png)

# The Setup in Auth0.com
## Tenants
As first step in configuration OKTA for authentication, and authorization, an account setup is done in [auth0.com](https://auth0.com).  

## Application API also known as 'Authorization Server'
The next step is creating application APIs i.e. auth server. It is responsible for creating access token, and authenticating, authorizing the request for resoures based on the permission given for the client applications.

![alt text](image-2.png)

As part of this, an API server named as 'Customer API Server' is created, and necessary access is given for the application clients.

## Permissions
The permissions or scope are the fundamental unit in OIDC, below 3 scopes were created for security 3 different endpoints.
![alt text](image-3.png)

## Persmission: Customer:Read
The permission 'customer:read' is created for securing the [/customer](http://localhost:8080/customer) endpoint. This endpoint validate the request for authenticity, and authorization. If just respond back to the customer with the client details if the client is having rights to access this /customer endpoint. It would return the corresponding messages with respective HTTP code otherwise.

## Persmission: Customer:Write
The permission 'customer:write' is created for securing the [PATCH][/customer](http://localhost:8080/customer) endpoint. This endpoint validate the request for authenticity, and authorization. If just respond back to the customer with the client details if the client is having rights to access this /customer endpoint. It returns the corresponding messages with respective HTTP code otherwise. It adds 'updated' attributes in the below JWT token received.

```bash
 {
    "header": {
        "typ": "JWT",
        "alg": "RS256",
        "kid": "E8M134Zt2ikbO9SGnG4c3"
    },
    "claims": {
        "iss": "https://dev-7srau5wfamip5pmt.us.auth0.com/",
        "sub": "9l8TIuaV8nL1VjVmeuCaBrSqWb0LKsxc@clients",
        "aud": "audience:customersApi",
        "iat": 1725610797,
        "exp": 1725697197,
        "scope": "customer:read customer:write",
        "gty": "client-credentials",
        "azp": "9l8TIuaV8nL1VjVmeuCaBrSqWb0LKsxc"
    },
    "updated": true
} 
```


## Persmission: Product:Read
The permission 'product:read' is created just to demonstrate the use of a client having none of the 'customer:read', 'customer:write' permission, however trying to access the /customer endpoints. How such a requests are validated for authenticity are demonstrated using this permission scope. 

The postman collection for 3 endpoints, along with token generation endpoints are attached at the end of this.

![alt text](image-5.png)

# Applications
The next step is creating, and setting up the application client, and give the right permissions. so application client can request access token with permissions provided and utitlise it for accessing the resources.

There are 3 type of application created to demonstrate the given usecase of how could an endpoint can be secured from unauthorized access.

## Application Type I (No access for customer endpoints)
Application named as 'Agent with no customer Access' is to demonstrate the usecase that if any unauthorised user trying the access the endpoint, how such a request will be responded.
![alt text](image-4.png)

## Application Type II (only having access for customer:read (/customer) endpoints)
Application named as 'Non-EK Travel Agents' is to demonstrate the usecase that if any unauthorised user trying the access the endpoint, how such a request will be responded even though it is allowed for reading.
![alt text](image-6.png)

## Application Type III (having access for customer:read (/customer) & customer:write ([PATCH]/customer)endpoints)
Application named as 'EK Travel Agents' is to demonstrate the usecase that if any authorised user trying the access the endpoint, how such a request is allowed to access the endpoint.
![alt text](image-7.png)

# Application Clients Credentials

  ## Agent with no customer Access

    "client_id": "zvERsbh7icfDZTJ4AtDWXnEpEU2R6TBW",
    "client_secret": "Wka2yD2okIQjuU9qBbi3h5mGkb0sZLJl4dcLX4a4sNhgeeG9DdvtK79Hjs3eqdDZ",
    "audience": "audience:customersApi",
    "grant_type": "client_credentials",
    "scope": "product.read"

  ##  Non-EK Travel Agents

    "client_id": "Igwv6SCyxpMAHTBB42QXqhlf3QsQv9w0",
    "client_secret": "N7d4TjO5EW6c81smnUiaLzkTstP8tStwX-J8dtuTI5nRerTmW6gSJ1DHHY1Pk4VH",
    "audience": "audience:customersApi",
    "grant_type": "client_credentials",
    "scope": "customer:read"

  ##  EK Travel Agents

    "client_id": "9l8TIuaV8nL1VjVmeuCaBrSqWb0LKsxc",
    "client_secret": "tnbXV7R0PZ4E4hPht-eVkZfxEiqOKU3b-smWQHIUtOjCa3gapO0qUflk1lssDBdK",
    "audience": "audience:customersApi",
    "grant_type": "client_credentials",
    "scope": "customer:read customer:write"

# The Endpoints 
  ## Application Service API OpenSpec specification

  ```
  {
  "openapi": "3.0.0",
  "info": {
    "title": "Customer API Access Management",
    "version": "1.0.0",
    "description": "OpenAPI specs for Customer API Access Management"
  },
  "paths": {
    "/": {
      "get": {
        "responses": {
          "200": {
            "description": "Successful response",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "message": {
                      "type": "string"
                    }
                  }
                }
              }
            }
          }
        }
      }
    },
    "/customer": {
      "get": {
        "responses": {
          "200": {
            "description": "Successful response",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "header": {
                      "type": "object",
                      "properties": {
                        "typ": {
                          "type": "string"
                        },
                        "alg": {
                          "type": "string"
                        },
                        "kid": {
                          "type": "string"
                        }
                      }
                    },
                    "claims": {
                      "type": "object",
                      "properties": {
                        "iss": {
                          "type": "string"
                        },
                        "sub": {
                          "type": "string"
                        },
                        "aud": {
                          "type": "string"
                        },
                        "iat": {
                          "type": "string"
                        },
                        "exp": {
                          "type": "string"
                        },
                        "scope": {
                          "type": "string"
                        },
                        "gty": {
                          "type": "string"
                        },
                        "azp": {
                          "type": "string"
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      },
      "patch": {
        "responses": {
          "200": {
            "description": "Successful response",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "header": {
                      "type": "object",
                      "properties": {
                        "typ": {
                          "type": "string"
                        },
                        "alg": {
                          "type": "string"
                        },
                        "kid": {
                          "type": "string"
                        }
                      }
                    },
                    "claims": {
                      "type": "object",
                      "properties": {
                        "iss": {
                          "type": "string"
                        },
                        "sub": {
                          "type": "string"
                        },
                        "aud": {
                          "type": "string"
                        },
                        "iat": {
                          "type": "string"
                        },
                        "exp": {
                          "type": "string"
                        },
                        "scope": {
                          "type": "string"
                        },
                        "gty": {
                          "type": "string"
                        },
                        "azp": {
                          "type": "string"
                        }
                      }
                    },
                    "updated": {
                      "type": "string"
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
  ```
# Token Generation Endpoints 
  The token generation endpoints, and other endpoints configured in postman collection for validating all such 3 cases are attached here for reference only. It is kept as part of the source code at customers/Customers API.postman_collection.json.

  ## Token Endpoints
  https://dev-7srau5wfamip5pmt.us.auth0.com/oauth/token

# Authorization Server Configuration
The authorization server or application API server configurations are,

   "CLIENT_DOMAIN": "dev-353xmsckencz5o4e.us.auth0.com"
   "Issuer": "dev-353xmsckencz5o4e.us.auth0.com"
    
