const express= require('express');
const ControllerCtegory= require('../controllers/Category.controller');
const route = express.Router();
route.get("/",(req,res)=>{
    console.group("Hello World");
});
route.post('/add',ControllerCtegory.Add);
route.get("/Menu",ControllerCtegory.listCategory);

module.exports=route;