const express=require('express');
const app=express();
const bcrypt=require('bcrypt-nodejs');
const cors=require('cors');
const knex=require('knex');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const db= knex ({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      port : 5432,
      user : 'postgres',
      password : 'YOUR PASSWORD',
      database : 'smart-brain'
    }
  });

  app.use(cors())
  app.use(express.json()); 
  
  app.get('/', (req, res)=> { res.send(db.users) })
  app.post('/signin', signin.handleSignin(db, bcrypt))
  app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt) })
  app.get('/profile/:id', (req, res) => { profile.handleProfileGet(req, res, db)})
  app.put('/image', (req, res) => { image.handleImage(req, res, db)})
  app.post('/imageurl', (req, res) => { image.handleApiCall(req, res)})
  
  app.listen(3000, ()=> {
    console.log('app is running on port 3000');
  })
