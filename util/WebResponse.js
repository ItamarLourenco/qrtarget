const i18n = require("i18n");
var ObjectId = require('mongoose').Types.ObjectId;

module.exports = {

    NOT_AUTHORIZED: -4,
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
        if(!ObjectId.isValid(id)){
            throw this.handle(this.VALIDATION_ERROR, "Please enter a valid ID", false);
        }
    },
};