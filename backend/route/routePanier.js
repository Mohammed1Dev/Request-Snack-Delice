const express= require('express');
const panier= require('../controllers/Panier.controller');
const route = express.Router();
route.get("/panier",panier.listPanier);
route.get("/panierProduct",panier.listPanierProduct)
route.post("/addPanier",panier.Add);
/*route.get("//:id",product.ProductSouCategorie);
route.post("/addProduct",product.Add);
route.delete("/removeAll",product.removeAll);
route.patch("/updateProduit/:id",product.UpdateProduct);

route.get("/productDetails/:id",product.productDetail);*/
module.exports=route;