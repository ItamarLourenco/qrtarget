var Model = require('nodejs-model');
var User = Model("User").attr('name',{
    validations:{
        presence:{
            message: "Name is required"
        }
    }
}).attr('password', {
    validations:{
        length:{
            minimum: 5,
            maximum: 20,
            messages:{
                tooShort: "Password is too shot!",
                tooLong: "Password is too long!"
            }
        }
    },
    tags: ['private']
});
module.exports = User;