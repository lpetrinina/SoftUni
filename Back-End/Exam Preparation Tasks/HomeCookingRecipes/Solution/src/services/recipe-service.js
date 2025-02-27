
import Recipe from "../models/Recipe.js";

const create = (recipeData, creatorId) => {

    const newRecipe = Recipe.create({
        ...recipeData,
        owner: creatorId,
    });

    return newRecipe;
};

const getLatest = () => {

    const latestRecipes = Recipe.find({}).sort({ createdAt: 'desc' }).limit(3);

    return latestRecipes;
};

const getAll = () => Recipe.find({});

const getOne = (recipeId) => Recipe.findById(recipeId);

const recommend = async (recipeId, userId) => {

    const recipe = await getOne(recipeId);

    if (recipe.owner.equals(userId)) {
        throw new Error('Can not recommend own recipes!')
    };

    if (recipe.recommendList.includes(userId)) {
        throw new Error('You have already recommended this recipe!')
    };

    recipe.recommendList.push(userId);
    return recipe.save();
}

const remove = async (recipeId, userId) => {
    const recipe = await getOne(recipeId);

    if (!recipe.owner.equals(userId)) {
        throw new Error('Only owner can delete this recipe!')
    };

    return Recipe.findByIdAndDelete(recipeId);
};

const update = async (recipeId, recipeData, userId) => {

    const recipe = await getOne(recipeId);

    if (!recipe.owner.equals(userId)) {
        throw new Error('Only owner can modify this recipe!')
    };

    return Recipe.findByIdAndUpdate(recipeId, recipeData, { runValidators: true })

};

const search = async (filter = {}) => {

    let query = await getAll();

    if (filter.title) {
        query = await Recipe.find({ title: { $regex: filter.title, $options: 'i' } });
    };

    return query;
}

const recipeService = {
    create,
    getLatest,
    getAll,
    getOne,
    recommend,
    remove,
    update,
    search
};

export default recipeService;