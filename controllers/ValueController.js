module.exports = {
    init: function(router){

        router.get('/', function(req, res, next) {
            res.render('index', { title: 'VALUE' });
        });

        router.get('/manolo', function(req, res, next) {
            res.render('index', { title: 'VALUE manolo' });
        });


        return router;
    },
};