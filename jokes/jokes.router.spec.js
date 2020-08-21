const server = require("../api/server")
const supertest = require('supertest')
const db = require('../database/dbConfig');


describe('Jokes tests', ()=>{
  beforeEach(async () => {
    await db("users").truncate();
  });

  describe('GET /jokes', ()=>{

    it('should return 401 when no token is passed', async ()=>{
       const res = await supertest(server).get('/api/jokes')

       expect(res.status).toBe(401)
       expect(res.body.message).toBe("please provide credentials")
    })

    it('should return 200 when a token is passed', async () =>{
      const user = {
        username: 'test',
        password: 'test123'
      }

      //register a user 
      await supertest(server).post('/api/auth/register').send(user)

      //Log user in 
      const res = await supertest(server).post('/api/auth/login').send(user)

      // get token 
      const token = res.body.token

      const jokes = await supertest(server).get('/api/jokes').set('authorization', token)
      
      expect(jokes.body).toHaveLength(20)
      
    })

  })

})