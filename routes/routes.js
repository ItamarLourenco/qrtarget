const express = require('express');
module.exports = {
    init: function(app){
        app.use('/', this.getRouter('HomeController'));
        app.use('/users', this.getRouter('UserController'));
        app.use('/forms', this.getRouter('FormController'));
        app.use('/values', this.getRouter('ValueController'));
    },

    getRouter: function(controller){
        const router = express.Router();
        require('../controllers/' + controller + '.js').init(router);
        return router;
    }
};