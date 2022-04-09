function resetErrors(inputs, errorTexts, errorInfo) {
    for (let i = 0; i < inputs.length; i++) {
        inputs[i].classList.remove("error-input");
    }
    for (let i = 0; i < errorTexts.length; i++) {
        errorTexts[i].innerText = "";
    }
    errorInfo.innerText = "";
}

function checkRequired(value) {
    if (!value) {
        return false;
    }
    value = value.toString().trim();
    if (value === "") {
        return false;
    }
    return true;
}

function checkTextLengthRange(value, min, max) {
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

function checkZipCode(value) {
    if (!value) {
        return false;
    }
    value = value.toString().trim();
    const regex = /[0-9]{2}-[0-9]{3}/i;
    return regex.test(value);
}

function checkPhoneNumber(value) {
    if (!value) {
        return false;
    }
    value = value.toString().trim();
    const regex = /[0-9]{9}/i;
    return regex.test(value);
}

function checkDirector(value) {
    if (!value) {
        return false;
    }
    value = value.toString();
    const regex = /[a-zA-Z]+\s[a-zA-Z]+/i;
    return regex.test(value);
}

function checkNegativeNumber(value) {
    if (!value) {
        return false;
    }
    if (value < 0) {
        return false
    }
    return true;
}

function checkDate(value) {
    if (!value) {
        return false;
    }
    const pattern = /(\d{4})-(\d{2})-(\d{2})/;
    return pattern.test(value);
}

function checkDateFuture(value, compareTO) {
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

function checkPassword(value) {
    const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;
    if (!passwordPattern.test(value)) {
        return false;
    }
    return true;
}

function checkNumber(value) {
    if (!value) {
        return false;
    }

    if (isNaN(value)) {
        return false;
    }
    return true;
}
