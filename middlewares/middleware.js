const express = require('express');

//Middleware array
const middleware = [
    express.static('public'), // for handle req.body extract
    express.urlencoded({ // for handle req.body extract but cannot extract multi from/file
        extended: true
    }),
    express.json()
];

module.exports = app => {
    middleware.forEach( m => {
        app.use(m);
    });
};