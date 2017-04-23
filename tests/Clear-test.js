'use strict';
const chai = require('chai');
const User = require("../models/User");

describe('Clear Tests ', function(){
    it("Users", function(done){
        User.remove({}, function(){
            dene()
        })
    });
});