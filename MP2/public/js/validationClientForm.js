function validateClientForm() {
    const firstNameInput = document.getElementById('FirstName');
    const lastNameInput = document.getElementById('LastName');
    const zipCodeInput = document.getElementById('PostCode');
    const phoneInput = document.getElementById('PhoneNumber');
    const loginInput = document.getElementById('Login');
    const passwordInput = document.getElementById('Password');
    const roleInput = document.getElementById('IdRole');

    const errorFirstName = document.getElementById('errorFirstName');
    const errorLastName = document.getElementById('errorLastName');
    const errorZipCode = document.getElementById('errorPostCode');
    const errorPhone = document.getElementById('errorPhoneNumber');
    const errorLogin = document.getElementById('errorLogin');
    const errorPassword = document.getElementById('errorPassword');
    const errorRole = document.getElementById('errorRole');
    const errorSummary = document.getElementById('errorSummary');

    const errorFieldRequiredMessage = document.getElementById('errorFieldRequiredMessage').innerText;
    const errorNumberFieldMessage = document.getElementById('errorNumberFieldMessage').innerText;
    const errorNegativeNumberCodeMessage = document.getElementById('errorNegativeNumberCodeMessage').innerText;
    const errorTextLengthRangeLastNameMessage = document.getElementById('errorTextLengthRangeLastNameMessage').innerText;
    const errorTextLengthRangePostCodeMessage = document.getElementById('errorTextLengthRangePostCodeMessage').innerText;
    const errorTextLengthRangePhoneInputMessage = document.getElementById('errorTextLengthRangePhoneInputMessage').innerText;
    const errorPhoneNumberMessage = document.getElementById('errorPhoneNumberMessage').innerText;
    const errorPostCodeMessage = document.getElementById('errorPostCodeMessage').innerText;
    const errorPasswordMessage = document.getElementById('errorPasswordMessage').innerText;
    const errorDirectorMessage = document.getElementById('errorDirectorMessage').innerText;
    const errorFormatDateMessage = document.getElementById('errorFormatDateMessage').innerText;
    const errorFutureDateMessage = document.getElementById('errorFutureDateMessage').innerText;
    const errorSummaryFormMessage = document.getElementById('errorSummaryFormMessage').innerText;

    resetErrors([firstNameInput, lastNameInput, zipCodeInput, phoneInput,loginInput,passwordInput,roleInput], [errorFirstName, errorLastName, errorZipCode, errorPhone,errorLogin,errorPassword,errorRole], errorSummary)
    let valid = true;

    if (!checkRequired(firstNameInput.value)) {
        valid = false;
        firstNameInput.classList.add("error-input");
        errorFirstName.innerText = errorFieldRequiredMessage;
    } else if (!checkTextLengthRange(firstNameInput.value, 2, 60)) {
        valid = false;
        firstNameInput.classList.add("error-input");
        errorFirstName.innerText = errorTextLengthRangeLastNameMessage;
    }

    if (!checkRequired(lastNameInput.value)) {
        valid = false;
        lastNameInput.classList.add("error-input");
        errorLastName.innerText = errorFieldRequiredMessage;
    } else if (!checkTextLengthRange(lastNameInput.value, 2, 60)) {
        valid = false;
        lastNameInput.classList.add("error-input");
        errorLastName.innerText = errorTextLengthRangeLastNameMessage;
    }

    if (!checkRequired(zipCodeInput.value)) {
        valid = false;
        zipCodeInput.classList.add("error-input");
        errorZipCode.innerText = errorFieldRequiredMessage;
    } else if (!checkTextLengthRange(zipCodeInput.value, 6, 6)) {
        valid = false;
        zipCodeInput.classList.add("error-input");
        errorZipCode.innerText = errorTextLengthRangePostCodeMessage;
    } else if (!checkZipCode(zipCodeInput.value)) {
        valid = false;
        zipCodeInput.classList.add("error-input");
        errorZipCode.innerText = errorPostCodeMessage;
    }

    if (phoneInput.value.length > 0) {
        if (!checkTextLengthRange(phoneInput.value, 9, 9)) {
            valid = false;
            phoneInput.classList.add("error-input");
            errorPhone.innerText = errorTextLengthRangePhoneInputMessage;
        } else if (!checkPhoneNumber(phoneInput.value)) {
            valid = false;
            phoneInput.classList.add("error-input");
            errorPhone.innerText = errorPhoneNumberMessage;
        }
    }

    if (!checkRequired(loginInput.value)) {
        valid = false;
        loginInput.classList.add("error-input");
        errorLogin.innerText = errorFieldRequiredMessage;
    }

    if (!checkRequired(passwordInput.value)) {
        valid = false;
        passwordInput.classList.add("error-input");
        errorPassword.innerText = errorFieldRequiredMessage;
    }else if(!checkPassword(passwordInput.value)){
        valid = false;
        passwordInput.classList.add("error-input");
        errorPassword.innerText = errorPasswordMessage;
    }

    if (!checkRequired(roleInput.value)) {
        valid = false;
        roleInput.classList.add("error-input");
        errorRole.innerText = errorFieldRequiredMessage;
    }

    if (!valid) {
        errorSummary.innerText = errorSummaryFormMessage;
    }

    return valid;
}

