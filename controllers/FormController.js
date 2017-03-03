module.exports = {
    init: function(router){

        router.get('/', function(req, res, next) {
            res.render('index', { title: 'FORM' });
        });

        router.get('/manolo', function(req, res, next) {
            res.render('index', { title: 'FORM manolo' });
        });


        return router;
    },
};