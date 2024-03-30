require('dotenv').config()
const express = require('express');
const app = express();
const PORT = process.env.PORT ||3000 ;
const path = require("path");
const cors = require('cors');

const mongoose = require('mongoose');

mongoose.connect("mongodb+srv://amlmahdawy21:AwxFJT9DHwJNQLK6@cluster0.lh1mpfk.mongodb.net/")
.then(()=>{console.log("connected")});

app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cors());

const AuthRoutes = require("./Routes/AuthRoutes")
const UsersRoutes = require("./Routes/UserRoutes")
const BookRoutes= require("./Routes/BookRoutes")
const CartRoutes=require("./Routes/CartRoutes")
const AdminRoutes=require("./Routes/adminRoutes")
app.use("/auth",AuthRoutes)
app.use("/user",UsersRoutes)
app.use("/book",BookRoutes)
app.use("/cart",CartRoutes)
app.use("/admin",AdminRoutes)
app.use('/assets', express.static(path.join(__dirname, 'public/assets')));


app.listen(PORT, ()=>{console.log("http://localhost:"+PORT)});
