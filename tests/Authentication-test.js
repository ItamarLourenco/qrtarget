'use strict';
const chai = require('chai');
const expect = chai.expect;
const configTest = require('./Config-test');
const User = require('../models/User');

//Execute User first
require("./User-test");


describe('Authentication', function(){
    var url = configTest.handleUrl('authenticate');

    it('validateLogin() - Validate login with out username and password', function(){
        var body = {};
        var user = new User(body);

        expect(false).to.equal(user.validateLogin());
    });

    it('validateLogin() - Validate login with out password', function(){
        var body = {username: configTest.username};
        var user = new User(body);

        expect(false).to.equal(user.validateLogin());
    });

    it('validateLogin() - Validate login with out username', function(){
        var body = {password: configTest.password};
        var user = new User(body);

        expect(false).to.equal(user.validateLogin());
    });

    it('validateLogin() - Validate login success', function(){
        var body = {username: configTest.username, password: configTest.password};
        var user = new User(body);

        expect(true).to.equal(user.validateLogin());
    });

    it('prepareForAuthenticate() - Prepare for authentication', function(){
        var body = {username: configTest.username, password: configTest.password};
        var user = new User(body);
        var schemaUser = {username: configTest.username, password: configTest.passwordMd5()};
        expect(schemaUser).to.eql(user.prepareForAuthenticate());
    });

    it('POST /authenticate - Api with out username and password', function(done){
        configTest.request.post(url, null, function(err, response, body){

            expect('{"code":-1,"message":"Please enter with username and password","success":false}')
                .to.equal(body);

            done();
        });
    });

    it('POST /authenticate - Api with out password', function(done){
        configTest.request.post(url, {from:{username: configTest.username}}, function(err, response, body){

            expect('{"code":-1,"message":"Please enter with username and password","success":false}')
                .to.equal(body);

            done();
        });
    });

    it('POST /authenticate - Api with out username', function(done){
        configTest.request.post(url, {from:{password: configTest.password}}, function(err, response, body){

            expect('{"code":-1,"message":"Please enter with username and password","success":false}')
                .to.equal(body);

            done();
        });
    });


    it('POST /authenticate - Api user not found with username correct', function(done){
        configTest.request.post(url, {form:{username: configTest.username, password: "###"}}, function(err, response, body){

            expect('{"code":1,"message":"No user found.","success":false,"object":null}')
                .to.equal(body);

            done();
        });
    });

    it('POST /authenticate - Api user not found with password correct', function(done){
        configTest.request.post(url, {form:{username: configTest.emailNotExist, password: configTest.password}}, function(err, response, body){

            expect('{"code":1,"message":"No user found.","success":false,"object":null}')
                .to.equal(body);

            done();
        });
    });

    it('POST /authenticate - Api user found', function(done){
        configTest.request.post(url, {form:{username: configTest.username, password: configTest.password}}, function(err, response, body){
            var res = JSON.parse(body);

            expect(res.code).to.equal(1);
            expect(res.message).to.equal("Successful login.");
            expect(res.success).to.equal(true);
            expect(res.object._id !== '' && res.object.name !== undefined).to.equal(true);
            expect(res.object.name !== '' && res.object.name !== undefined).to.equal(true);
            expect(res.object.password).to.equal(configTest.passwordMd5());
            expect(res.object.username).to.equal(configTest.username);
            expect(res.object.authKey !== '' && res.object.authKey !== undefined).to.equal(true);

            done();
        });
    });
});