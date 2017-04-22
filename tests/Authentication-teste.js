'use strict';
const chai = require('chai');
const expect = chai.expect;
const il8n = require('../util/Custom-il8n');
const User = require('../models/User');
const md5 = require('md5');

describe('Authentication', function(){
    var username = "itamar.developer@gmail.com";
    var password = "6949519";

    it('ValidateLoginWithOutUsernameAndPassword', function(){
        var body = {};
        var user = new User(body);

        expect(false).to.equal(user.validateLogin());
    });

    it('ValidateLoginWithOutPassword', function(){
        var body = {username: username};
        var user = new User(body);

        expect(false).to.equal(user.validateLogin());
    });

    it('ValidateLoginWithOutUsername', function(){
        var body = {password: password};
        var user = new User(body);

        expect(false).to.equal(user.validateLogin());
    });

    it('ValidateLoginSuccess', function(){
        var body = {username: username, password: password};
        var user = new User(body);

        expect(true).to.equal(user.validateLogin());
    });

    it('PrepareForAuthentication', function(){
        var body = {username: username, password: password};
        var user = new User(body);
        var schemaUser = {username: username, password: md5(password)};
        expect(schemaUser).to.eql(user.prepareForAuthenticate());
    });

    it('AuthenticationWithSuccess', function(){
        var body = {username: username, password: password};
        var user = new User(body);
        request
            .post('/authenticate')
            .send(user.prepareForAuthenticate())
            .expect(200)
            .expect('Content-Type', 'application/json')
            .end(function(err, res){
                console.log(err, res);
            })
    });
});