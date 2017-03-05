const mongoose = require('mongoose');
const i18n = require("i18n");
module.exports = mongoose.model('User',
    {
        name: {
            type: String, required: [true, i18n.__('Please fill in the name.')],
            validate:
            [
                function(name){
                    return name.length >= 5;
                },
                i18n.__('Name is longer than 5 characters.')
            ]
        },
        username: {
            type: String, required: [true, i18n.__('Please fill in the e-mail (username).')],
            validate:
                [
                    function(username){
                        return /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(username);
                    },
                    i18n.__('Sorry, but this email is not valid.')
                ]
        },
        password: {
            type: String, required: [true, i18n.__('Please fill in the password.')],
            validate:
            [
                function(model){
                    return model.length >= 5;
                },
                i18n.__('Password is longer than 5 characters.')
            ]
        },
        __v: { type: Number, select: false},
    }
);