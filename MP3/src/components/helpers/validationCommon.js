 export function resetErrors(inputs, errorTexts, errorInfo) {
    for (let i = 0; i < inputs.length; i++) {
        inputs[i].classList.remove("error-input");
    }
    for (let i = 0; i < errorTexts.length; i++) {
        errorTexts[i].innerText = "";
    }
    errorInfo.innerText = "";
}

 export function checkRequired(value) {
    if (!value) {
        return false;
    }
    value = value.toString().trim();
    if (value === "") {
        return false;
    }
    return true;
}

 export function checkTextLengthRange(value, min, max) {
    if (!value) {
        return false;
    }
    value = value.toString().trim();
    const length = value.length;
    if (max && length > max) {
        return false;
    }
    if (min && length < min) {
        return false;
    }
    return true;
}

 export function checkZipCode(value) {
    if (!value) {
        return false;
    }
    value = value.toString().trim();
    const regex = /[0-9]{2}-[0-9]{3}/i;
    return regex.test(value);
}

 export function checkPhoneNumber(value) {
    if (!value) {
        return false;
    }
    value = value.toString().trim();
    const regex = /[0-9]{9}/i;
    return regex.test(value);
}

 export function checkDirector(value) {
    if (!value) {
        return false;
    }
    value = value.toString();
    const regex = /[a-zA-Z]+\s[a-zA-Z]+/i;
    return regex.test(value);
}

 export function checkNegativeNumber(value) {
    if (!value) {
        return false;
    }
    if (value < 0) {
        return false
    }
    return true;
}

 export function checkDate(value) {
    if (!value) {
        return false;
    }
    const pattern = /(\d{4})-(\d{2})-(\d{2})/;
    return pattern.test(value);
}

 export function checkDateFuture(value, compareTO) {
    if (!value) {
        return false;
    }
    if (!compareTO) {
        return false;
    }
    const pattern = /(\d{4})-(\d{2})-(\d{2})/;
    if (!pattern.test(value)) {
        return false;
    }
    if (!pattern.test(value)) {
        return false;
    }

    if (new Date(value).getTime() > new Date(compareTO).getTime()) {
        return false;
    }

    return true;
}

 export function checkPassword(value) {
    const passwordPattern = !/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})$/i.test(value);
    if (!passwordPattern.test(value)) {
        return false;
    }
    return true;
}

 export function checkNumber(value) {
    if (!value) {
        return false;
    }

    if (isNaN(value)) {
        return false;
    }
    return true;
}
