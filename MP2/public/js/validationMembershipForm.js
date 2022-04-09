function validationMembershipForm() {
    const idClientInput = document.getElementById('IdClient');
    const idGroupInput = document.getElementById('IdGroup');
    const clientNickInput = document.getElementById('ClientNick');

    const errorIdClient = document.getElementById('errorIdClient');
    const errorIdGroup = document.getElementById('errorIdGroup');
    const errorClientNick = document.getElementById('errorClientNick');
    const errorSummary = document.getElementById("errorSummary");

    const errorFieldRequiredMessage = document.getElementById('errorFieldRequiredMessage').innerText;
    const errorNumberFieldMessage = document.getElementById('errorNumberFieldMessage').innerText;
    const errorNegativeNumberCodeMessage = document.getElementById('errorNegativeNumberCodeMessage').innerText;
    const errorTextLengthRangeLastNameMessage = document.getElementById('errorTextLengthRangeLastNameMessage').innerText;
    const errorTextLengthRangePostCodeMessage = document.getElementById('errorTextLengthRangePostCodeMessage').innerText;
    const errorTextLengthRangePhoneInputMessage = document.getElementById('errorTextLengthRangePhoneInputMessage').innerText;
    const errorTextLengthRangeGroupNameMessage = document.getElementById('errorTextLengthRangeGroupNameMessage').innerText;
    const errorTextLengthRangeClientNickMessage = document.getElementById('errorTextLengthRangeClientNickMessage').innerText;
    const errorTextLengthRangeDescriptionMessage = document.getElementById('errorTextLengthRangeDescriptionMessage').innerText;
    const errorPhoneNumberMessage = document.getElementById('errorPhoneNumberMessage').innerText;
    const errorPostCodeMessage = document.getElementById('errorPostCodeMessage').innerText;
    const errorPasswordMessage = document.getElementById('errorPasswordMessage').innerText;
    const errorDirectorMessage = document.getElementById('errorDirectorMessage').innerText;
    const errorFormatDateMessage = document.getElementById('errorFormatDateMessage').innerText;
    const errorFutureDateMessage = document.getElementById('errorFutureDateMessage').innerText;
    const errorSummaryFormMessage = document.getElementById('errorSummaryFormMessage').innerText;

    resetErrors([idClientInput, idGroupInput, clientNickInput], [errorIdClient, errorIdGroup, errorClientNick], errorSummary);

    let valid = true;
    if (!checkRequired(idClientInput.value)) {
        valid = false;
        idClientInput.classList.add("error-input");
        errorIdClient.innerText = errorFieldRequiredMessage;
    }

    if (!checkRequired(idGroupInput.value)) {
        valid = false;
        idGroupInput.classList.add("error-input");
        errorIdGroup.innerText = errorFieldRequiredMessage;
    }

    if (clientNickInput.value != '') {
        if (!checkTextLengthRange(clientNickInput.value, 2, 60)) {
            valid = false;
            clientNickInput.classList.add("error-input");
            errorClientNick.innerText = errorTextLengthRangeClientNickMessage;
        }
    }

    if (!valid) {
        errorSummary.innerText = errorSummaryFormMessage;
    }

    return valid;

}