
const { request, response } = require('express')
const { Pool } = require('pg')
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'test_db',
  password: 'root',
  port: 5432,
})
const createUser = (request, response) => {
    const { name, email } = request.body
  
    pool.query('INSERT INTO users (name, email) VALUES ($1, $2)', [name, email], (error, results) => {
      if (error) {
        throw error
      }
      response.redirect('/',{'message':'User is saved successfully'});
    })
  }
  const getUser = (request, response) => {
      pool.query('SELECT * FROM users', (error, results) => {
      if (error) {
        throw error
      }
      response.render('index',{data:results.rows});
      //response.status(200).json(results.rows)
    })
  }
  const getUserById = (request, response) => {
    const id = parseInt(request.params.id)
    pool.query('SELECT * FROM users where id=$1',[id], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }
  const deleteUserById = (request, response) =>{
    const id = parseInt(request.params.id)
    pool.query('DELETE from users where id=$1', [id], (error, results)=>{
      if (error) {
        throw error
      }
      response.redirect('/');
    })
  }
  const updateUser = (request, response) => {
    const id = parseInt(request.body.id)
    const { name, email } = request.body
      pool.query(
      'UPDATE users SET name = $1, email = $2 WHERE id = $3',
      [name, email, id],
      (error, results) => {
        if (error) {
          throw error
        }
        response.redirect('/',{'message':'User is updated successfully!!'});
      }
    )
  }
  module.exports = {
    createUser,
    getUser,
    getUserById,
    deleteUserById,
    updateUser,
  }