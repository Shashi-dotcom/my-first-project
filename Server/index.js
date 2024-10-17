const express=require('express')
const mongoose=require('mongoose')
const cors=require('cors')
const  UserModel=require('./model/users')
require('dotenv').config();
// mongoose.connect('mongodb://127.0.0.1:27017/crud')
// const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

const app= express()
app.use(cors())
app.use(express.json())

app.post("/createUser",(req,res)=>{
    UserModel.create(req.body)
    .then(users => res.json(users))
    .catch(err => res.json(err))
})

app.get("/",(req,res)=>{
    UserModel.find({})
    .then(users => res.json(users))
    .catch(error => res.json(error))
})

app.get('/getUser/:id',(req,res)=>{
    const id=req.params.id;
    UserModel.findById({_id: id})
    .then(users => res.json(users))
    .catch(error => res.json(error))
})

app.put('/updateUser/:id' ,(req,res)=>{
    const id=req.params.id;
    UserModel.findByIdAndUpdate({_id: id} , {
        name:req.body.name ,
        email:req.body.email ,
        age:req.body.age
    })
    .then(users => res.json(users))
    .catch(error => res.json(error))
})
app.delete('/deleteUser/:id',(req,res)=>{
    const id=req.params.id;
    UserModel.findByIdAndDelete({_id: id})
    .then(res =>{console.log("backend error")
     res.json(res) })
    .catch(error => res.json(error))
})
app.listen(3001,()=>{
    console.log("Server is RUnning");    
})

