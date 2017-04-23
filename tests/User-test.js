'use strict';
const chai = require('chai');
const expect = chai.expect;
const configTest = require('./Config-test');
const User = require("../models/User");

describe('User', function(){
    var url = configTest.handleUrl("users");
    var user_id = null;

    it('/POST - Create user without params', function(done){
        configTest.request.post(url, '', function(err, response, body){
            body = JSON.parse(body);

            expect(body.code).to.equal(-2);
            expect(body.message).to.equal('User validation failed');
            expect(body.success).to.equal(false);
            expect([
                'Please fill in the password.',
                'Please fill in the e-mail (username).',
                'Please fill in the name.'
            ]).to.eql(body.object);
            done();
        });
    });

    it('/POST - Create user without one param', function(done){
        configTest.request.post(url, {form:{password: configTest.password, name:configTest.name}}, function(err, response, body){
            body = JSON.parse(body);


            expect(body.code).to.equal(-2);
            expect(body.message).to.equal('User validation failed');
            expect(body.success).to.equal(false);
            expect([
                'Please fill in the e-mail (username).',
            ]).to.eql(body.object);
            done();
        });
    });

    it('/POST - Create user with incorrect email', function(done){
        configTest.request.post(url, {form:{password: configTest.password, name:configTest.name, username: "emailincorrectgmail.com"}}, function(err, response, body){
            body = JSON.parse(body);

            expect(body.code).to.equal(-2);
            expect(body.message).to.equal('User validation failed');
            expect(body.success).to.equal(false);
            expect([
                'Sorry, but this email is not valid.',
            ]).to.eql(body.object);
            done();
        });
    });

    it('/POST - Create user with password small 5 char', function(done){
        configTest.request.post(url, {form:{password: "1", name:configTest.name, username: configTest.emailNotExist}}, function(err, response, body){
            body = JSON.parse(body);


            expect(body.code).to.equal(-2);
            expect(body.message).to.equal('User validation failed');
            expect(body.success).to.equal(false);
            expect([
                'Password is longer than 5 characters.',
            ]).to.eql(body.object);
            done();
        });
    });

    it('/POST - Create user with name small 5 char', function(done){
        configTest.request.post(url, {form:{password: configTest.password, name:"A", username: configTest.emailNotExist}}, function(err, response, body){
            body = JSON.parse(body);


            expect(body.code).to.equal(-2);
            expect(body.message).to.equal('User validation failed');
            expect(body.success).to.equal(false);
            expect([
                'Name is longer than 5 characters.',
            ]).to.eql(body.object);
            done();
        });
    });

    it('/POST - Create user with success', function(done){
        configTest.request.post(url, {form:{password: configTest.password, name:configTest.name, username: configTest.username}}, function(err, response, body){
            body = JSON.parse(body);


            expect(body.message).to.equal('User saved successfully.');
            expect(body.code).to.equal(1);
            expect(body.success).to.equal(true);

            user_id = body.object._id;
            done();
        });
    });

    it('/POST - Create user with exist username', function(done){
        configTest.request.post(url, {form:{password: configTest.password, name:configTest.name, username: configTest.username}}, function(err, response, body){
            body = JSON.parse(body);

            expect(body.code).to.equal(-1);
            expect(body.message).to.equal('Duplicate username');
            expect(body.success).to.equal(false);

            done();
        });
    });

    it('/PUT - Update user without valid ID', function(done){
        configTest.request.put(url, {form:{password: configTest.password, name:configTest.name, username: configTest.username}}, function(err, response, body){
            body = JSON.parse(body);

            expect(body.code).to.equal(-2);
            expect(body.message).to.equal('Please enter a valid ID');
            expect(body.success).to.equal(false);

            done();
        });
    });

    it('/PUT - Update user with valid ID but not exist', function(done){
        configTest.request.put(url, {form:{id: '58fc0c9d0b5378e4860bb01c', name:configTest.name, username: configTest.username}}, function(err, response, body){
            body = JSON.parse(body);

            expect(body.message).to.equal('No results found.');
            expect(body.code).to.equal(-3);
            expect(body.success).to.equal(false);

            done();
        });
    });

    it('/PUT - Update user with incorrect information', function(done){
        configTest.request.put(url, {form:{id: user_id, password: "1", name:"A", username: "err"}}, function(err, response, body){
            body = JSON.parse(body);

            expect(body.message).to.equal('Validation failed');
            expect(body.code).to.equal(-2);
            expect(body.success).to.equal(false);
            expect([
                'Name is longer than 5 characters.',
                'Sorry, but this email is not valid.'
            ]).to.eql(body.object);
            done();
        });
    });

    it('/PUT - Update user with success WithOut Password', function(done){
        configTest.request.put(url, {form:{id: user_id, name:configTest.name + " ALTER", username: "alter_"+configTest.username}}, function(err, response, body){
            body = JSON.parse(body);


            expect(body.message).to.equal('User successfully changed.');
            expect(body.code).to.equal(1);
            expect(body.success).to.equal(true);
            expect(body.object.name).to.eql(configTest.name + " ALTER");
            expect(body.object.username).to.eql("alter_"+configTest.username);
            done();
        });
    });

    it('/PUT - Update user is correct', function(done){
        configTest.request.put(url, {form:{id: user_id, name:configTest.name, username: configTest.username}}, function(err, response, body){
            body = JSON.parse(body);


            expect(body.message).to.equal('User successfully changed.');
            expect(body.code).to.equal(1);
            expect(body.success).to.equal(true);
            expect(body.object.name).to.eql(configTest.name);
            expect(body.object.username).to.eql(configTest.username);
            done();
        });
    });

});