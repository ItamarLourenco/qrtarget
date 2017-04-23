'use strict';
const chai = require('chai');
const expect = chai.expect;
const configTest = require('./Config-test');
const User = require("../models/User");

describe('Delete User', function(){
    var url = configTest.handleUrl("users");
    var user_id = null;

    it('DELETE - Delete user with incorrect id', function(done){
        configTest.request.delete(url, {form: {id: "4510805138053893"}}, function(err, response, body){
            body = JSON.parse(body);

            expect(body.message).to.equal('Please enter a valid ID');
            expect(body.code).to.equal(-2);
            expect(body.success).to.equal(false);
            done();

        });
    });

    it('DELETE - Delete user with success', function(done){
        User.findOne({username: configTest.username}, function(err, model){
            if(model){
                configTest.request.delete(url, {form: {id: model._id.toString()}}, function(err, response, body){
                    body = JSON.parse(body);

                    expect(body.message).to.equal('User successfully removed.');
                    expect(body.code).to.equal(1);
                    expect(body.success).to.equal(true);
                    return done();

                });
            }else{
                return done();
            }
        });
    });
});