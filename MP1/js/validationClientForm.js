function validateClientForm() {
    const firstNameInput = document.getElementById('name');
    const lastNameInput = document.getElementById('lastName');
    const zipCodeInput = document.getElementById('postCode');
    const phoneInput = document.getElementById('phone');

    const errorFirstName = document.getElementById('errorName');
    const errorLastName = document.getElementById('errorLastName');
    const errorZipCode = document.getElementById('errorPostCode');
    const errorPhone = document.getElementById('errorPhone');
    const errorSummary = document.getElementById('errorSummary');
    let valid = true;

    if (!checkRequired(firstNameInput.value)) {
        valid = false;
        firstNameInput.classList.add("error-input");
        errorFirstName.innerText = "Pole jest wymagane";
    } else if (!checkTextLengthRange(firstNameInput.value, 2, 60)) {
        valid = false;
        firstNameInput.classList.add("error-input");
        errorFirstName.innerText = "Pole powinno zawierać od 2 do 60 znaków";
    }

    if (!checkRequired(lastNameInput.value)) {
        valid = false;
        lastNameInput.classList.add("error-input");
        errorLastName.innerText = "Pole jest wymagane";
    } else if (!checkTextLengthRange(lastNameInput.value, 2, 60)) {
        valid = false;
        lastNameInput.classList.add("error-input");
        errorLastName.innerText = "Pole powinno zawierać od 2 do 60 znaków";
    }

    if (!checkRequired(zipCodeInput.value)) {
        valid = false;
        lastNameInput.classList.add("error-input");
        errorZipCode.innerText = "Pole jest wymagane";
    } else if (!checkTextLengthRange(zipCodeInput.value, 6, 6)) {
        valid = false;
        lastNameInput.classList.add("error-input");
        errorZipCode.innerText = "Pole powinno zawierać od 2 do 60 znaków";
    } else if (!checkZipCode(zipCodeInput.value)) {
        valid = false;
        zipCodeInput.classList.add("error-input");
        errorZipCode.innerText = "Pole powinno zawierac poprawny Polski kod pocztowy";
    }

    if (phoneInput.value.length > 0) {
        if (!checkTextLengthRange(phoneInput.value, 9, 9)) {
            valid = false;
            phoneInput.classList.add("error-input");
            errorPhone.innerText = "Pole powinno zawierać 9 znaków";
        } else if (!checkPhoneNumber(phoneInput.value)) {
            valid = false;
            phoneInput.classList.add("error-input");
            errorPhone.innerText = "Pole powinno zawierać same cyfry";
        }
    }

    if (!valid) {
        errorSummary.innerText = "Formularz zawiera błędy";
    }

    return valid;
}

