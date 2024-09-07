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
      
  })