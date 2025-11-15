import {language, ValidationName} from "@/lib/lang/language";
import {RequestValidation} from "@/lib/Validation/RequestValidation";

class IsValid {
    static _attributes = [];
    static _values = null;
    static _transLateLanguage = {};
    static _messageError = [];
    static _isValidInput = false;

    static set messageError(value) {
        IsValid._messageError.push(value)
    }

    static get messageError() {
        return IsValid._messageError;
    }

    static set isValidInput(value) {
        IsValid._isValidInput = value
    }

    static get isValidInput() {
        return IsValid._isValidInput;
    }

    static set attributes(value) {

        IsValid._attributes = value;
    }

    static get attributes() {
        return IsValid._attributes;
    }

    static set values(value) {
        IsValid._values = value
    }

    static get values() {
        return IsValid._values
    }

    static getPersianNameInput() {
        const objectKey = Object.keys(IsValid.attributes ?? {})
        if (Array.isArray(objectKey) && objectKey.length > 0) {
            objectKey.forEach((item) => {
                if (language[item]) {
                    IsValid._transLateLanguage[item] = language[item]
                }
            })
            return IsValid._transLateLanguage;
        }
        return {}
    }

    static validate() {
        IsValid._messageError=[];
        Object.entries(IsValid.attributes).forEach(([inputName, validationMethod]) => {
            if (validationMethod.includes('|')) {
                const saeMethod = validationMethod.split('|');
                saeMethod.forEach(methodString => {
                    IsValid.callMethod({[inputName]: methodString})
                })
            }else
            {
                IsValid.callMethod({[inputName]: validationMethod})
            }
        })
    }

    static callMethod(method) {
        Object.entries(method).forEach(([inputName, validationMethod]) => {

            const reg = new RegExp("^[A-Za-z]*", "gmi");
            const methodName = reg.exec(validationMethod)[0] ?? ''.trim()
            if (typeof IsValid[methodName] == 'function') {
                IsValid[methodName](inputName, validationMethod)
            }
        })

    }

    static required(inputName) {
        if (!IsValid.values[inputName]) {
            IsValid.isValidInput = true;
            const prInputName = language[inputName] ?? inputName;
            let message = ValidationName['required'].replace(':attribute:', prInputName) ?? '';
            IsValid.messageError = {
                 message
            }
        }
    }
    static length(inputName,law) {
    }

    static in(inputName, law) {

        const value = IsValid.values[inputName] ?? '';
        law = law.replace('in:', '')
        law = law.split(',');
        if (value) {
            if (!law.includes(value)) {
                IsValid.isValidInput = true;
                const prInputName = language[inputName] ?? inputName;
                let message = ValidationName['in'].replace(':attribute:', prInputName) ?? '';
                message = message.replace('()', `(${law.join(',')})`)
                IsValid.messageError = {
                    message
                }
            }
        } else {
            IsValid.isValidInput = true;
            const prInputName = language[inputName] ?? inputName;
            let message = ValidationName['in'].replace(':attribute:', prInputName) ?? '';
            message = message.replace('()', `(${law.join(',')})`)
            IsValid.messageError = {
                message
            }
        }
    }
    static numeric(inputName){
        const value=IsValid.values[inputName];
        if (!Number.isInteger(value)){
            IsValid.isValidInput=true;
            let message=ValidationName['numeric']??'';
            const prInputName = language[inputName] ?? '';
            message=message.replace(':attribute:',prInputName)
            IsValid.messageError={
                message
            }
        }
    }


}

export default IsValid;