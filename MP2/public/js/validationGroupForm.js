function validationGroupForm() {
    const groupNameInput = document.getElementById('GroupName');
    const descriptionInput = document.getElementById('Description');

    const errorGroupName = document.getElementById('errorGroupName');
    const errorDescription = document.getElementById('errorDescription');
    const errorSummary = document.getElementById('errorSummary');

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

    resetErrors([groupNameInput, descriptionInput], [errorGroupName, errorDescription], errorSummary);
    let valid = true;

    let nowDate = new Date(), month = nowDate.getMonth() + 1, year = nowDate.getFullYear(), day = nowDate.getDay();
    if (month.length < 0) {
        month = '0' + month;
    }

    if (day.length < 2) {
        day = '0' + day;
    }

    const nowDateString = [year, month, day].join('-');

    if (!checkRequired(groupNameInput.value)) {
        valid = false;
        groupNameInput.classList.add("error-input");
        errorGroupName.innerText = errorFieldRequiredMessage;
    } else if (!checkTextLengthRange(groupNameInput.value, 2, 60)) {
        valid = false;
        groupNameInput.classList.add("error-input");
        errorGroupName.innerText = errorTextLengthRangeGroupNameMessage;
    }
/*
    if (!checkRequired(creationDateInput.value)) {
        valid = false;
        creationDateInput.classList.add("error-input");
        errorCreationDate.innerText = errorFieldRequiredMessage;
    } else if (!checkDate(creationDateInput.value)) {
        valid = false;
        creationDateInput.classList.add("error-input");
        errorCreationDate.innerText = errorFormatDateMessage;
    } else if (!checkDateFuture(creationDateInput.value, nowDateString)) {
        valid = false;
        creationDateInput.classList.add("error-input");
        errorCreationDate.innerText = errorFutureDateMessage;
    }
*/

    if (descriptionInput.value != '') {
        if (!checkTextLengthRange(descriptionInput.value, 2, 200)) {
            valid = false;
            descriptionInput.classList.add("error-input");
            errorDescription.innerText = errorTextLengthRangeDescriptionMessage;
        }
    }

    if (!valid) {
        errorSummary.innerText = errorSummaryFormMessage;
    }

    return valid;

}