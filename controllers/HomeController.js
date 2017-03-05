module.exports = {
    init: function(router){
        router.get('/', function(req, res, next) {

            res.render('index', { title: 'Suprise Bem vindo fdp' });
        });

        return router;
    }
};