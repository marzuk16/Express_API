require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const config = require('config');


const setMiddleware = require('./middlewares/middleware');
const setRoutes = require('./routes/routes');


const PORT = process.env.PORT || 3000;
const dbUser = config.get('db-username');
const dbUserPass = config.get('db-password');
const dbName = config.get('db-name');   
const mongoDBUrl = `mongodb+srv://${dbUser}:${dbUserPass}@cluster0.arzvi.mongodb.net/${dbName}?retryWrites=true&w=majority`;

const app = express();


//using middleware from middleware directory
setMiddleware(app);

//using routes from route directory
setRoutes(app);

app.use((req, res, next) => {
    let error = new Error('404 Page Not Found');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    if(error.status === 404){
        console.log(error);
        res.status(404).json({
            error: "404 Page Not Found"
        });
    }
    console.log(error);
    res.status(500).json({
        error: "Internal Server Error"
    });
});


mongoose.connect(mongoDBUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
    })
    .then(() => {
        //console.log(`Database connected`);
        app.listen(PORT, () => {
            console.log(`SERVER IS RUNNING ON ${PORT}`);
        });
    })
    .catch(error => {
        return console.log(error);
    })