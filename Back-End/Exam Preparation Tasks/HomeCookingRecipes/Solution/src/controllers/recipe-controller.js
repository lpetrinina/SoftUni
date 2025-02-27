import { Router } from "express";

import { isAuth } from "../middlewares/auth-middleware.js";
import recipeService from "../services/recipe-service.js";
import { getErrorMessage } from "../utils/error-utils.js";

const recipeController = Router();


recipeController.get('/create', isAuth, (req, res) => {

    res.render('recipes/create');
});

recipeController.post('/create', isAuth, async (req, res) => {

    const creatorId = req.user.id;
    const recipeData = req.body;

    try {

        const newRecipe = await recipeService.create(recipeData, creatorId);

        res.redirect('/');
    } catch (err) {
        const currentError = getErrorMessage(err);

        res.render('recipes/create', { error: currentError, recipe: recipeData });
    }

});

// ---------------- Catalog Page -----------------------
recipeController.get('/catalog', async (req, res) => {

    const recipes = await recipeService.getAll();

    res.render('catalog', { recipes });
});

// ---------------- Details Page -----------------------
recipeController.get('/:recipeId/details', async (req, res) => {
    const recipeId = req.params.recipeId;
    const recipe = await recipeService.getOne(recipeId);

    const isOwner = req.user && req.user.id === recipe.owner.toString();
    const isRecommended = recipe.recommendList.includes(req.user?.id);

    res.render('recipes/details', { recipe, isOwner, isRecommended })
});


// Recommend the recipe
recipeController.get('/:recipeId/recommend', isAuth, async (req, res) => {
    const recipeId = req.params.recipeId;
    const userId = req.user.id;

    try {
        await recipeService.recommend(recipeId, userId);

        res.redirect(`/recipes/${recipeId}/details`)

    } catch (err) {
        res.render('404', { error: getErrorMessage(err) })
    }

});

// Delete the recipe
recipeController.get('/:recipeId/delete', isAuth, async (req, res) => {
    const recipeId = req.params.recipeId;
    const userId = req.user.id;

    try {
        await recipeService.remove(recipeId, userId);

        res.redirect('/recipes/catalog');
    } catch (err) {
        res.render('404', { error: getErrorMessage(err) });
    }
});

// Edit the recipe
recipeController.get('/:recipeId/edit', isAuth, async (req, res) => {
    const recipeId = req.params.recipeId;
    const userId = req.user.id;

    const recipe = await recipeService.getOne(recipeId);

    if (!recipe.owner.equals(userId)) {
        return res.render('404', { error: 'Only owner can modify this recipe!' })
    }

    res.render('recipes/edit', { recipe });
});

recipeController.post('/:recipeId/edit', isAuth, async (req, res) => {
    const recipeId = req.params.recipeId;
    const recipeData = req.body;
    const userId = req.user.id;

    try {

        await recipeService.update(recipeId, recipeData, userId);

        res.redirect(`/recipes/${recipeId}/details`);
    } catch (err) {

        res.render('recipes/edit', { error: getErrorMessage(err), recipe: recipeData })
    };

});

// ---------------- Search Page -----------------------
recipeController.get('/search', async (req, res) => {
    const filter = req.query;

    const recipes = await recipeService.search(filter);

    res.render('search', { recipes });
});

export default recipeController;