import { Router } from "express";

import { isAuth } from "../middlewares/auth-middleware.js";
import productService from "../services/product-service.js";
import { getErrorMessage } from "../utils/error-utils.js";

const productController = Router();


// ---------------- CREATE PAGE -------------------------
productController.get('/create', isAuth, (req, res) => {
    res.render('products/create');
});

productController.post('/create', isAuth, async (req, res) => {

    const productData = req.body;
    const userId = req.user.id;

    try {

        const newProduct = await productService.create(productData, userId);
        res.redirect('/products/catalog')

    } catch (err) {
        const currentError = getErrorMessage(err)
        res.render('products/create', { product: productData, error: currentError })
    };

});

// ---------------- CATALOG PAGE -------------------------
productController.get('/catalog', async (req, res) => {

    const products = await productService.getAll();

    res.render('products/catalog', { products })
});
export default productController;

// ---------------- DETAILS PAGE -------------------------

productController.get('/:productId/details', async (req, res) => {
    const productId = req.params.productId;
    const userId = req.user?.id;

    const product = await productService.getOne(productId);

    // Check is Owner
    const isOwner = product.owner.equals(userId);

    // Check is recommend
    const isRecommend = product.recommendList.includes(userId);

    res.render('products/details', { product, isOwner, isRecommend });
});

//Recommend functionality
productController.get('/:productId/recommend', isAuth, async (req, res) => {
    const productId = req.params.productId;
    const userId = req.user.id;

    try {
        await productService.recommed(productId, userId);
        //redirect to product details
        res.redirect(`/products/${productId}/details`);

    } catch (err) {
        res.render('404', { error: getErrorMessage(err) });

    };
});

// Delete
productController.get('/:productId/delete', isAuth, async (req, res) => {
    const productId = req.params.productId;
    const userId = req.user.id;

    try {
        await productService.remove(productId, userId);

        res.redirect('/products/catalog')
    } catch (err) {
        res.render('404', { error: getErrorMessage(err) })
    }
});

// ---------------- EDIT PAGE -------------------------
productController.get('/:productId/edit', isAuth, async (req, res) => {
    const userId = req.user?.id;
    const productId = req.params.productId;
    const productData = await productService.getOne(productId);


    if (!productData.owner.equals(userId)) {
        return res.render('404', { error: 'Only creator can modify this product!' })
    }

    res.render('products/edit', { product: productData });
});

productController.post('/:productId/edit', isAuth, async (req, res) => {
    const userId = req.user.id;
    const productId = req.params.productId;
    const newData = req.body;


    try {
        await productService.update(productId, newData, userId);

        res.redirect(`/products/${productId}/details`)
    } catch (err) {

        res.render('products/details', { error: getErrorMessage(err), product: newData })
    };
});


//Search page
productController.get('/search', async (req, res) => {
    const filter = req.query;
    const filteredProducts = await productService.search(filter);

    res.render('products/search', { products: filteredProducts });
});
