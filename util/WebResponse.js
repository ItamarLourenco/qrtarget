'use strict';
const i18n = require("i18n");
var ObjectId = require('mongoose').Types.ObjectId;

module.exports = {

    RESULT_NOT_FOUND: -3,
    VALIDATION_ERROR: -2,
    REQUEST_ERROR: -1,
    REQUEST_OK: 1,

    handle:function(code, message, success, json){
        if(typeof json !== 'undefined'){
            //Errors Validations
            if(json !== null && typeof json.errors !== 'undefined' && json.errors !== undefined) {
                var messageError = [];
                var erro;
                for(erro in json.errors){
                    messageError.push(json.errors[erro].message);
                }

                success = false;
                code = this.VALIDATION_ERROR;
                json = messageError;
            }


            //Error not found
            if(json !== null && typeof json.name !== 'undefined' && json.name === 'CastError') {
                message = 'No results found.';
                code = this.RESULT_NOT_FOUND;
            }

            try{
                message = this.handleErrorCode(json.code) ? this.handleErrorCode(json.code) : message;
            }catch (e){}
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
    },
};