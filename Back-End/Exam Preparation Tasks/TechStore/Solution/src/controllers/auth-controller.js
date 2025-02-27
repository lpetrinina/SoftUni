import { Router } from "express";

import { AUTH_COOKIE_NAME } from "../config.js";
import authService from "../services/auth-service.js";
import { isAuth, isGuest } from "../middlewares/auth-middleware.js";
import { getErrorMessage } from "../utils/error-utils.js";

const authController = Router();


// -------------------- Login -----------------------------
authController.get('/login', isGuest, (req, res) => {

    res.render('auth/login');
});

authController.post('/login', isGuest, async (req, res) => {
    const { email, password } = req.body;

    try {
        const token = await authService.login(email, password);

        res.cookie(AUTH_COOKIE_NAME, token, { httpOnly: true }); //Set cookie
        res.redirect('/');

    } catch (err) {
        const error = getErrorMessage(err);

        res.render('auth/login', { error, user: { email } })
    };
});


// --------------------- Register --------------------------
authController.get('/register', isGuest, (req, res) => {

    const token = req.user;

    res.render('auth/register');
});

authController.post('/register', isGuest, async (req, res) => {

    const userData = req.body;

    try {
        const token = await authService.register(userData);

        res.cookie(AUTH_COOKIE_NAME, token, { httpOnly: true });
        return res.redirect('/');

    } catch (err) {
        const error = getErrorMessage(err);

        return res.render('auth/register', { error, user: userData })
    };
});

// -------------- Logout --------------------------
authController.get('/logout', isAuth, (req, res) => {
    res.clearCookie(AUTH_COOKIE_NAME);

    res.redirect('/');
});

export default authController;