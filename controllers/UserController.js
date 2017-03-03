module.exports = {
    init: function(router){

        router.get('/', function(req, res, next) {
            res.render('index', { title: 'USER' });
        });

        router.get('/manolo', function(req, res, next) {
            res.render('index', { title: 'USER manolo' });
        });

        router.get('/manolo/haiaih', function(req, res, next) {
            res.render('index', { title: 'USER manolo hiahaih' });
        });

        return router;
    },
};