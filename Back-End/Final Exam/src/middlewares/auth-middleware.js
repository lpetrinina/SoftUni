import jwt from 'jsonwebtoken';

import { AUTH_COOKIE_NAME, JWT_SECRET } from "../config.js";


export const auth = (req, res, next) => {

    const token = req.cookies[AUTH_COOKIE_NAME];

    // Check if user is guest
    if (!token) {
        return next();
    };

    try {
        const decodedToken = jwt.verify(token, JWT_SECRET);

        req.user = decodedToken;
        res.locals.user = decodedToken;

    } catch (error) {

        res.clearCookie(AUTH_COOKIE_NAME);
        return res.redirect('/auth/login');
    }

    next();
};


export const isAuth = (req, res, next) => {

    if (!req.user) {
        return res.redirect('/auth/login');
    };

    next();
};

export const isGuest = (req, res, next) => {

    if (req.user) {
        return res.render('404')
    };

    next();
};