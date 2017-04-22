var webResponse = require('../util/WebResponse');

module.exports = function(router){

    var withOutAuthentication = [
        'authenticate', 'user'
    ];

    router.all('*', function(req, res, next){
        console.log('Accessing API');

        var isAuthentication = withOutAuthentication.filter(function(item){
           return req.originalUrl.indexOf(item) !== -1;
        }).length <= 0;

        if(!isAuthentication) return next();

        var authKey = req.headers.authkey;
        if(authKey === undefined || authKey === ''){
            return res.send(webResponse.handle(webResponse.NOT_AUTHORIZED, "Please enter a valid authentication key", false));
        }

        var User = require("../models/User");
        User.findOne({'authKey': authKey}, function(err, user){
            if(err) return res.send(webResponse.handle(webResponse.REQUEST_ERROR, err.message, false, err));

            if(!user){
                return res.send(webResponse.handle(webResponse.NOT_AUTHORIZED, "Please enter a valid authentication key", false));
            }

            next();
        });
    });

    return router;

};