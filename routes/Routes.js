const express = require('express');
var api = require('./Api');
module.exports = {
    init: function(app){
        app.use('/', this.getRouter('HomeController'));
        app.use('/users', this.getRouter('UserController'));
        app.use('/forms', this.getRouter('FormController'));
        app.use('/values', this.getRouter('ValueController'));
    },

    getRouter: function(controller){
        var router = express.Router();
        require('../controllers/' + controller + '.js').init(router);
        router = api(router);
        return router;
    }
};