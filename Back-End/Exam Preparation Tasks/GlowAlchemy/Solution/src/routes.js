import { Router } from "express";

import homeController from "./controllers/home-controller.js";
import authController from "./controllers/auth-controller.js";
import productController from "./controllers/product-controller.js";

const routes = Router();

// TODO: Define routes
routes.use(homeController);
routes.use('/auth', authController);
routes.use('/products', productController);


export default routes;