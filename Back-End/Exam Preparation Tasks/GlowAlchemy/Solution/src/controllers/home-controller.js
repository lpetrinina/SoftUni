import { Router } from "express";

import productService from "../services/product-service.js";

const homeController = Router();

homeController.get('/', async (req, res) => {

    const latesProducts = await productService.getLatest();

    res.render('home', { products: latesProducts });
});

export default homeController;