const express = require('express');
const app = express();
const User = require('./models/user')
const mongoose = require('mongoose');
const cors = require('cors');

mongoose.connect('mongodb://localhost:27017/Auth', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("MONGO CONNECTION OPEN!")
    })
    .catch(err => {
        console.log("MONGO CONNECTION ERROR!")
        console.log(err)
    })

app.use(express.json());    
app.use(express.urlencoded({ extended: true }));
app.use(cors());
    

app.post('/login', (req, res) =>{
    const {email, password} = req.body;
    User.findOne({email: email}, (err, user) => {
        if(user){
            if(password === user.password){
                res.send({message: 'Login successful'});
            } else{
                res.send({message: 'Password incorrect'});
            }
        } else{
            res.send({message: 'User does not exist'});
        }
    });    
})

app.post('/register', (req, res) =>{
    const {name, email, password, reEnterPassword} = req.body;
    User.findOne({email: email}, (err, user) => {
        if(user){
            res.send({message: 'User already exist'});
        } else{
            const newUser = new User({name, email, password, reEnterPassword});
            newUser.save(err => {
                if(err){
                    res.send(err);
                } else{
                    res.send({message: 'Successfully registred'})
                }
            });
        }
    });   
})

app.listen(3001, (req, res) =>{
    console.log('Listening on port:3001');
})
