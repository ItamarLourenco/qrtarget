const i18n = require("i18n");

module.exports = {

    VALIDATION_ERROR: -2,
    REQUEST_ERROR: -1,
    REQUEST_OK: 1,

    handle:function(code, message, success, json){
        if(json != null && json.hasOwnProperty('errors')) {
            var messageError = [];
            for(erro in json.errors){
                messageError.push(json.errors[erro].message);
            }

            success = false;
            code = this.VALIDATION_ERROR;
            json = messageError;
        }

        return {
            code: code,
            message: i18n.__(message),
            success: success,
            object: json
        };
    }
};