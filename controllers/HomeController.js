'use strict';
module.exports = {
    init: function(router){
        router.get('/', function(req, res, next) {
            res.render('index', { title: 'Welcome to QRTarhet' });
        });

        return router;
    }
};