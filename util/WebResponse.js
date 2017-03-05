const i18n = require("i18n");
var ObjectId = require('mongoose').Types.ObjectId;

module.exports = {

    RESULT_NOT_FOUND: -3,
    VALIDATION_ERROR: -2,
    REQUEST_ERROR: -1,
    REQUEST_OK: 1,

    handle:function(code, message, success, json){

        //Errors Validations
        if(json != null && json.hasOwnProperty('errors') && json.errors != undefined) {
            var messageError = [];
            for(erro in json.errors){
                messageError.push(json.errors[erro].message);
            }

            success = false;
            code = this.VALIDATION_ERROR;
            json = messageError;
        }


        //Error not found
        if(json != null && json.hasOwnProperty('name') && json.name == 'CastError') {
            message = 'No results found.'
            code = this.RESULT_NOT_FOUND;
        }

        return {
            code: code,
            message: i18n.__(message),
            success: success,
            object: json
        };
    },
    checkId: function(id){
        return ObjectId.isValid(id);
    },
    throwErrorCheckId: function(){
        return {
            code: this.VALIDATION_ERROR,
            message: i18n.__("Please enter a valid ID"),
            success: false,
        };
    }
};