const express= require('express');
const mongoose = require("./database/config");
const bodyParser= require('body-parser');
const fs = require('fs');
var easyinvoice = require('easyinvoice');
const app= express();


//router
let RouteTwo = require('./route/routeSouCategory');
let RouteOne = require('./route/router');
let RouteProduct= require('./route/routeProduct');
let RoutePanier= require('./route/routePanier');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.use(function(req,res,next){
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods","GET, POST, PUT, DELETE, OPTION");
    next();
    });
app.use("/api/",RouteOne);
app.use("/api/",RouteTwo);
app.use("/api/",RouteProduct);
app.use("/api/",RoutePanier);

app.use((req,res,next)=>{
    res.status(404).send('Sorry Dont find this route');
    
});
const PORT = process.env.PORT || 3000;
app.listen(PORT,()=>{
    console.log(`Server listen this Port ${PORT}`);
});

