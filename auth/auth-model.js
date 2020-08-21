const db = require('../database/dbConfig')

module.exports = {
  addUser,
  getUserById,
  findByUsername
}

function addUser(user){
  return db('users').insert(user)
    .then(ids =>{
      return getUserById(ids[0])
    })
}

function getUserById(id){
  return db('users').where({id}).first()
}

function findByUsername(username){
  return db('users').where({username}).first()
}