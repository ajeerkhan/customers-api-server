const request = require('supertest')
const app = require('../src/index');

describe('Sanity test', () => {
    test('1 should equal 1', () => {
      expect(1).toBe(1)
    })
  })

  describe('API Router Test', () => {
    test('public url test: should return thank you', async () => {
        const res = await request(app)
          .get('/');
        expect(res.statusCode).toEqual(200)
        expect(res.body).toEqual({
          message: "Thank you for utilizing the services!!!"
        })
      })

      test('/customer: protectd endpoint : should throw an 401 for invalid header', async () => {
        const res = await request(app).get('/customer');
        expect(res.statusCode).toEqual(401);
        console.log(res.body);
        expect(res.body).toEqual({
        })
      })

      test('/customer: protected endpooint, should throw an 401 for no authorization header passed', async () => {
        const res = await request(app).get('/customer');
        expect(res.statusCode).toEqual(401);
        console.log(res.body);
        expect(res.body).toEqual({
        })
      })

      test('/customer: protected endpooint, should throw an 401 for authorization header passed not passing as bearer token', async () => {
        const res = await request(app).get('/customer').set('Authorization', 'abc123');
        expect(res.statusCode).toEqual(401);
        console.log(res.body);
        expect(res.body).toEqual({
        })
      })

      test('/customer: protected endpooint,  however client do not have permission in the token', async () => {
        const accessToken = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IkU4TTEzNFp0MmlrYk85U0duRzRjMyJ9.eyJpc3MiOiJodHRwczovL2Rldi03c3JhdTV3ZmFtaXA1cG10LnVzLmF1dGgwLmNvbS8iLCJzdWIiOiJ6dkVSc2JoN2ljZkRaVEo0QXREV1huRXBFVTJSNlRCV0BjbGllbnRzIiwiYXVkIjoiYXVkaWVuY2U6Y3VzdG9tZXJzQXBpIiwiaWF0IjoxNzI1NjcyNDc0LCJleHAiOjE3MjU3NTg4NzQsInNjb3BlIjoicHJvZHVjdC5yZWFkIiwiZ3R5IjoiY2xpZW50LWNyZWRlbnRpYWxzIiwiYXpwIjoienZFUnNiaDdpY2ZEWlRKNEF0RFdYbkVwRVUyUjZUQlcifQ.eLZCj-TPQPA2jCXGD__u8QgeAQx_JcRVl1g09lWkMiWmj-Ff4PE2KZfPeC7KzmBW8imr9pg_0rbaAghEaQXuray1EiEUS_J_usI6reIQzJ3kn0qF5pMsoG6XpN3OLtJVLg62b7C83HcjXHP4rOUlPNtYAwd0vlU7fBZ8awEEeiD5ZHe6GuyOofC4q27-w4xvvTR2C2O2-p_dkqtfoyfVD2RFC9P9s7JsIRxHCTR8aOrbQcf6U0W6KcAiBcpNFzRIgqQ7QTlqOrZxS_dYF4p8LFff-08L4bxkfWrjPTIdz4QOC-6wFQaub6Dkz_VIv-lpZJ35OI-3bJ0DBfqA6Z2XuA";

        const res = await request(app).get('/customer').set('Authorization', accessToken);
        expect(res.statusCode).toEqual(401);
        console.log(res.body);
        expect(res.body).toEqual({
        })
      })

      test('/customer: protected api, with token has customer:read scope accesss', async () => {
        const accessToken = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IkU4TTEzNFp0MmlrYk85U0duRzRjMyJ9.eyJpc3MiOiJodHRwczovL2Rldi03c3JhdTV3ZmFtaXA1cG10LnVzLmF1dGgwLmNvbS8iLCJzdWIiOiJ6dkVSc2JoN2ljZkRaVEo0QXREV1huRXBFVTJSNlRCV0BjbGllbnRzIiwiYXVkIjoiYXVkaWVuY2U6Y3VzdG9tZXJzQXBpIiwiaWF0IjoxNzI1NjcyNDc0LCJleHAiOjE3MjU3NTg4NzQsInNjb3BlIjoicHJvZHVjdC5yZWFkIiwiZ3R5IjoiY2xpZW50LWNyZWRlbnRpYWxzIiwiYXpwIjoienZFUnNiaDdpY2ZEWlRKNEF0RFdYbkVwRVUyUjZUQlcifQ.eLZCj-TPQPA2jCXGD__u8QgeAQx_JcRVl1g09lWkMiWmj-Ff4PE2KZfPeC7KzmBW8imr9pg_0rbaAghEaQXuray1EiEUS_J_usI6reIQzJ3kn0qF5pMsoG6XpN3OLtJVLg62b7C83HcjXHP4rOUlPNtYAwd0vlU7fBZ8awEEeiD5ZHe6GuyOofC4q27-w4xvvTR2C2O2-p_dkqtfoyfVD2RFC9P9s7JsIRxHCTR8aOrbQcf6U0W6KcAiBcpNFzRIgqQ7QTlqOrZxS_dYF4p8LFff-08L4bxkfWrjPTIdz4QOC-6wFQaub6Dkz_VIv-lpZJ35OI-3bJ0DBfqA6Z2XuA";

        const res = await request(app).get('/customer').set('Authorization', accessToken);
        expect(res.statusCode).toEqual(401);
        console.log(res.body);
        expect(res.body).toEqual({
        })
      })

      test('/customer: protected api, has only customer:read access', async () => {
        const accessToken = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IkU4TTEzNFp0MmlrYk85U0duRzRjMyJ9.eyJpc3MiOiJodHRwczovL2Rldi03c3JhdTV3ZmFtaXA1cG10LnVzLmF1dGgwLmNvbS8iLCJzdWIiOiJJZ3d2NlNDeXhwTUFIVEJCNDJRWHFobGYzUXNRdjl3MEBjbGllbnRzIiwiYXVkIjoiYXVkaWVuY2U6Y3VzdG9tZXJzQXBpIiwiaWF0IjoxNzI1NjczNzM5LCJleHAiOjE3MjU3NjAxMzksInNjb3BlIjoiY3VzdG9tZXI6cmVhZCIsImd0eSI6ImNsaWVudC1jcmVkZW50aWFscyIsImF6cCI6Iklnd3Y2U0N5eHBNQUhUQkI0MlFYcWhsZjNRc1F2OXcwIn0.c9q7hkcJi6YpZ_uOsJIN6aQdOBBPAOSYwnmJXRJi_ch6VhHlBRZXBXLGkPZlFuSR0gMtGNGdoP2m-r0DzS3G4fQtNNVgBk8wzmqQdG0ErpxkBnU9DXbxDUxfQwGb1yuinqIa5TmP_mbZYFuF5n-bzLHe-tPiZWxnnqZ8Ilr2ZKGknjlIN9i9rfckXiwoW6UN6dL6m8uCLB6VeYNWhvIdKF5MQ7EOGbcAcH3GVslX-eSOZnxtaw1E9M2Cv97VOkfHjx_Gh3o-1xgrejeBgNFGNiF3knvgyq8C5xGi5g6MsFQMvvdUfnwHo7sROKfM-vlMb6fUpt5GnbmYr5duYZIW6w";

        const res = await request(app).patch('/customer').set('Authorization', accessToken);
        expect(res.statusCode).toEqual(401);
        console.log(res.body);
        expect(res.body).toEqual({
        })
      })

      test('/customer: protected api, has only customer:write access', async () => {
        const accessToken = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IkU4TTEzNFp0MmlrYk85U0duRzRjMyJ9.eyJpc3MiOiJodHRwczovL2Rldi03c3JhdTV3ZmFtaXA1cG10LnVzLmF1dGgwLmNvbS8iLCJzdWIiOiI5bDhUSXVhVjhuTDFWalZtZXVDYUJyU3FXYjBMS3N4Y0BjbGllbnRzIiwiYXVkIjoiYXVkaWVuY2U6Y3VzdG9tZXJzQXBpIiwiaWF0IjoxNzI1NjczOTQ0LCJleHAiOjE3MjU3NjAzNDQsInNjb3BlIjoiY3VzdG9tZXI6cmVhZCBjdXN0b21lcjp3cml0ZSIsImd0eSI6ImNsaWVudC1jcmVkZW50aWFscyIsImF6cCI6IjlsOFRJdWFWOG5MMVZqVm1ldUNhQnJTcVdiMExLc3hjIn0.JwaDN6N9uqfeCzAjkjDdXFNXRpT4C3M6q0jsMx3YDP4tCf6xfXRvwFAJtZgUu1gXuoFk_Ht3lrDa0JwKuMecRGmF_3bqQD_YwJfw_WRT2BWFbVc4n_6Q0sdaG3wDh6GK6JIduWpTCfk9BvE13Wad6Owelry4WVUVbFLpU16HC2srUjaIJZGd4g4gpcWe-htuFsZRlV8zQ-k4YIgzLV31ND1uaV6rYkZFrTFOls2EiqbBP8t3LxjmKx5Iskfllp_rj7BjBnNAptjnbb8KVa6PoGRaicvU8X4hDqvbIXNg0cMICJx_IUOrWgq4zpBWAndjrWqLeNlHvDSvguYcApmaag";

        const res = await request(app).patch('/customer').set('Authorization', accessToken);
        expect(res.statusCode).toEqual(401);
        console.log(res.body);
        expect(res.body).toEqual({
        })
      })
      
  })