const homeRoute = require('./homeRoute');
const productRoute = require("./productRoute");

const routes = [
    
    {
        path: '/home',
        handler: homeRoute
    },
    {
        path: '/product',
        handler: productRoute
    },
    {
        path: '/',
        handler: (req, res) => {

            res.redirect('/home');
        }
    }
];

module.exports = (app) => {
    routes.forEach(r => {
        if(r.path === '/'){
            
            app.get(r.path, r.handler);
        }else{
            
            app.use(r.path, r.handler);
        }
    });
};