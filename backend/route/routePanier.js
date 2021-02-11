const express= require('express');
const panier= require('../controllers/Panier.controller');
const route = express.Router();
route.get("/panier",panier.listPanier);
route.get("/panierProduct",panier.listPanierProduct)
route.post("/addPanier",panier.Add);
route.post("/updatePanier/:id",panier.updatePanier);
route.get("/removePanier/:id",panier.deletePanier);
route.get("/removeAllPanier",panier.removeAllPanier)
module.exports=route;