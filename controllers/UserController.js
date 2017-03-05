var User = require("../models/User");
var webResponse = require('../util/WebResponse');
module.exports = {
    init: function(router){

        router.get('/', function(req, res) {
            //var params = Object.assign(req.params, req.query); //For example
            User.find({}, function (err, users) {
                res.send(users);
            })
        });

        /**
         * For Saved
         * {"name": "Itamar Lourenço3", "password": 6949519, "username": "itamar.developer@gmail.com"}
         */
        router.post('/', function(req, res) {
            var user = new User(req.body);
            user.save(function (err) {
                if(err) return res.send(webResponse.handle(webResponse.REQUEST_ERROR, err.message, false, err));

                res.send(webResponse.handle(webResponse.REQUEST_OK, "User saved successfully.", true));
            });
        });

        /**
         * For updated
         * {"id":"58bbab3d08c6c40b7dbf2783", "name": "Novo nome"}
         */
        router.put('/', function(req, res){
            try { webResponse.checkId(req.body.id) } catch (e) { return res.send(e) }

            User.findByIdAndUpdate(req.body.id, req.body, {runValidators: true, new: true}, function(err, model){
                if(err) return res.send(webResponse.handle(webResponse.REQUEST_ERROR, err.message, false, err));

                if(!model) return res.send(webResponse.handle(webResponse.RESULT_NOT_FOUND, 'No results found.', false));

                res.send(webResponse.handle(webResponse.REQUEST_OK, "User successfully changed.", true, model));
            })
        });

        /**
         * For remove
         * {"id":"58bbab3d08c6c40b7dbf2783"}
         */
        router.delete('/', function(req, res){
            try { webResponse.checkId(req.body.id) } catch (e) { return res.send(e) }

            User.findOneAndRemove({_id: req.body.id}, function(err, model){
                if(err) return res.send(webResponse.handle(webResponse.REQUEST_ERROR, err.message, false, err));

                if(!model) return res.send(webResponse.handle(webResponse.RESULT_NOT_FOUND, 'No results found.', false));

                res.send(webResponse.handle(webResponse.REQUEST_OK, "User successfully removed.", true));
            });
        });


        return router;
    }
};