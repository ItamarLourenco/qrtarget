const mongoose = require('mongoose');
var User = mongoose.model('User',
    {
        name: {type: String, required: [true, 'Bota o nome do gato aó']},
        raca: {type: String, required: [true, 'Bota o nome do raca aó']}
    }
);