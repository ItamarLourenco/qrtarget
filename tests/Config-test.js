'use strict';
const md5 = require('md5');
const il8n = require('../util/Custom-il8n');
const request = require('request');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/QRTarget', function(err, database) {
    if (err) return console.log(err);
});

var configTest = {
    url: 'http://localhost:3000/',
    handleUrl: function(uri) {
        return configTest.url + uri
    },
    name: "Itamar Louernço",
    username: "itamar.developer@gmail.com",
    emailNotExist: "emailnotexist@gmail.com",
    password: '6949519',
    passwordNotExist: '###',
    passwordMd5: function(){
        return md5(configTest.password);
    },
    md5: md5,
    request: request
};
module.exports =  configTest;