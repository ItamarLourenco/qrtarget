'use strict';
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
        if(json !== undefined && json !== null){
            if(json.hasOwnProperty('errors') && json.errors !== undefined) {
                var messageError = [];
                var error;

                for(error in json.errors){
                    if(json.hasOwnProperty('erro')){
                        messageError.push(json.errors[error].message);
                    }
                }

                success = false;
                code = this.VALIDATION_ERROR;
                json = messageError;
            }


            //Error not found
            if(json.hasOwnProperty('name') && json.name === 'CastError') {
                message = 'No results found.';
                code = this.RESULT_NOT_FOUND;
            }

            if(json.hasOwnProperty('code')){
                message = this.handleErrorCode(json.code) ? this.handleErrorCode(json.code) : message;    
            }
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
    handleErrorCode: function(code){
        switch (code){
            case 11000:
                return i18n.__("Duplicate username");
        }

        return false;
    }
};