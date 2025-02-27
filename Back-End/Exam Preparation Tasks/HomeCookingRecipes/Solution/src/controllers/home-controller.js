import { Router } from "express";

import recipeService from "../services/recipe-service.js";

const homeController = Router();

homeController.get('/', async (req, res) => {

    const latestRecipes = await recipeService.getLatest();
    res.render('home', { recipes: latestRecipes });
});

export default homeController;