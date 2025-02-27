import express from 'express';
import handlebars from 'express-handlebars';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';

import routes from './routes.js';
import { auth } from './middlewares/auth-middleware.js';

const app = express();

// Database setup
try {
    const uri = 'mongodb://localhost:27017/powerOfNature';
    await mongoose.connect(uri);

    console.log('DB conntected!');
} catch (err) {
    console.error('Can not connect to DB!')
    console.log(err.message);

}

// Handlebars setup
app.engine('hbs', handlebars.engine({
    extname: 'hbs',
    runtimeOptions: {
        allowedProtoProperties: true,
        allowProtoPropertiesByDefault: true
    },
    helpers: {
        setTitle(title) {
            this.pageTitle = title;
        },
    }
}));
app.set('view engine', 'hbs');
app.set('views', './src/views');


// Express setup
app.use(express.static('src/public'));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(auth);
app.use(routes); //Routes


app.listen(3000, () => console.log('Server is listening on http://localhost:3000...'));
