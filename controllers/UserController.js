var User = require("../models/User");
var webResponse = require('../util/WebResponse');
module.exports = {
    init: function(router){

        router.get('/', function(req, res) {
            User.find({}, function (err, users) {
                res.send(users);
            })
        });

        router.post('/', function(req, res) {
            var user = new User(req.body);
            user.save(function (err) {
                if(err) return res.send(webResponse.handle(webResponse.REQUEST_ERROR, err.message, false, err));

                res.send(webResponse.handle(webResponse.REQUEST_OK, "User saved successfully.", true))
            });
        });
        return router;
    },
};