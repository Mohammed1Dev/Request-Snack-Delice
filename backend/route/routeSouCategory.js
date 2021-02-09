const express= require('express');
const souCategory= require('../controllers/SouCategory.controller');
const route = express.Router();
route.post('/AddSou',souCategory.Add);
route.get("/souCategory",souCategory.listSouCategory);
route.delete("/delete/:id",souCategory.deleteSouCategorie);
route.get("/souCategory/:id",souCategory.SouCat);
module.exports=route;