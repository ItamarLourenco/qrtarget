'use strict';
var User = require("../models/User");
var webResponse = require('../util/WebResponse');

module.exports = {
    init: function(router){
        router.post('/', function(req, res){
            var user = new User(req.body);
            if(user.validateLogin()){
                user = user.prepareForAuthenticate();
                User.findOne(user, function(err, model){
                    if(model){
                        model.generateAuthKey();
                        model.save(function (err) {
                            if(err) return res.send(webResponse.handle(webResponse.REQUEST_ERROR, err.message, false, err));

                            return res.send(webResponse.handle(webResponse.REQUEST_OK, "Successful login.", true, model));
                        });
                        return true;
                    }
                    return res.send(webResponse.handle(webResponse.REQUEST_OK, "No user found.", false, model));
                });

                return true;
            }

            return res.send(webResponse.handle(webResponse.REQUEST_ERROR, "Please enter with username and password", false));
        });
    }
};