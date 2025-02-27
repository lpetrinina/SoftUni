import { Router } from "express";

import deviceService from "../services/device-service.js";
import { isAuth } from "../middlewares/auth-middleware.js";

const homeController = Router();

homeController.get('/', async (req, res) => {

    const latestDevices = await deviceService.getLatest();

    res.render('home', { devices: latestDevices }); //{ pageTitle: 'TechStore | Home' }) //, { devices: latestDevices//
});

homeController.get('/about', (req, res) => {
    res.render('about');
});

homeController.get('/profile', isAuth, async (req, res) => {

    const ownDevices = await deviceService.getUserDevices(req.user.id);
    const preferredDevices = await deviceService.getPreferredDevices(req.user.id);



    res.render('profile', { ownDevices, preferredDevices });
});

export default homeController;