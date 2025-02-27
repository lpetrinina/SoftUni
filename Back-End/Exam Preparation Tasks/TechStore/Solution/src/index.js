import express from 'express';
import handlebars from 'express-handlebars';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';

import routes from './routes.js';
import { auth } from './middlewares/auth-middleware.js';

const app = express();

// Database setup
try {
    const uri = 'mongodb://localhost:27017/techStore'; // TODO: Change db name!!!
    await mongoose.connect(uri);

    console.log('DB conntected!');
} catch (err) {
    console.error('Can not connect to DB!')
    console.log(err.message);

}

// Handlebars setup
app.engine('hbs', handlebars.engine({ //Register handlebars
    extname: 'hbs',
    runtimeOptions: {
        allowedProtoProperties: true,
        allowProtoPropertiesByDefault: true
    },
    helpers: {
        setTitle(title) { //Add dynamic page title helper
            this.pageTitle = title;
        },
    }
}));
app.set('view engine', 'hbs'); //For view engine use handlebars
app.set('views', './src/views'); // Set the right path for views folder


// Express setup
app.use(express.static('src/public')); // Add static middleware
app.use(express.urlencoded({ extended: false })); // Add urlencoded middleware
app.use(cookieParser());
app.use(auth);
app.use(routes); //Routes

app.listen(3000, () => console.log('Server is listening on http://localhost:3000...'));
