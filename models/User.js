const mongoose = require('mongoose');
const i18n = require("i18n");
const md5 = require('md5');

var userSchema = new mongoose.Schema({
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
        set : function(password){
            return password != '' ? md5(password) : '';
        },
        validate:
            [
                function(password){
                    return password.length >= 5;
                },
                i18n.__('Password is longer than 5 characters.')
            ]
    },
    authKey: {
      type: String
    },
    __v: {
        type: Number, select: false
    },
    _id: false
});

userSchema.methods.validateLogin = function () {
    return (this.password != undefined && this.password != '') && (this.username != undefined && this.username != '');
};

userSchema.methods.generateAuthKey = function (isReturn) {
    var authKey = md5(new Date().getTime() + Math.random() * (9999));
    if(isReturn){
        return authKey;
    }

    this.authKey = authKey;
};

module.exports = mongoose.model('User', userSchema);
