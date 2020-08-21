const supertest = require("supertest");
const server = require('../api/server')
const db = require('../database/dbConfig');
const { expectCt } = require("helmet");

describe("Auth Tests", () => {
  //empty users table before each test
  beforeEach(async () => {
    await db("users").truncate();
  });

  describe("/register", () => {
    
    it("should register a user to database", async () => {
      
      const user = {
        username: 'test',
        password: 'test123'
      }

      const res = await supertest(server).post('/api/auth/register').send(user)

      const users = await db('users')
      //checks username in database to equal passed in user
      expect(res.body.username).toBe(user.username)
      expect(users).toHaveLength(1)

    });

    it('should hash the password', async () =>{
      const user = {
        username: 'test',
        password: 'test123'
      }

      const res = await supertest(server).post('/api/auth/register').send(user)

      //Password should not be equal
      expect(res.body.password).not.toBe(user.password)

    })

  });

  describe('/login', () =>{

    it('should return a token if password is correct',  async ()=>{
      
      const user = {
        username: 'test',
        password: 'test123'
      }

      //register a user 
      await supertest(server).post('/api/auth/register').send(user)

      //Log user in 
      const res = await supertest(server).post('/api/auth/login').send(user)

      // Check if token exists 

      // expect(res.body.token).toBeUndefined()
      expect(res.body.token).toBeDefined()
    })

    it('should return 401 if credentials are wrong', async ()=>{
      const user = {
        username: 'test',
        password: 'test123'
      }

      //register a user 
      await supertest(server).post('/api/auth/register').send(user)



      //Log user in with wrong credentials

      const wrongPassword = {
        username: 'test',
        password: 'test12'
      }
      let res = await supertest(server).post('/api/auth/login').send(wrongPassword)

      expect(res.status).toBe(401)


      const wrongUsername = {
        username: 'test2',
        password: 'test123'
      }

       res = await supertest(server).post('/api/auth/login').send(wrongUsername)

      expect(res.status).toBe(401)
    })

  })

});
