function validateStoreForm() {
    const idOrderInput = document.getElementById('IdOrder');
    const idMovieInput = document.getElementById('IdMovie');
    const costInput = document.getElementById('Cost');
    const amountInput = document.getElementById('Amount');

    const errorIdOrder = document.getElementById('errorIdOrder');
    const errorIdMovie = document.getElementById('errorIdMovie');
    const errorCost = document.getElementById('errorCost');
    const errorAmount = document.getElementById('errorAmount');
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

    resetErrors([idOrderInput, idMovieInput, costInput, amountInput], [errorIdOrder, errorIdMovie, errorCost, errorAmount], errorSummary)
    let valid = true;

    if (!checkRequired(idOrderInput.value)) {
        valid = false;
        idOrderInput.classList.add("error-input");
        errorIdOrder.innerText = errorFieldRequiredMessage;
    }

    if (!checkRequired(idMovieInput.value)) {
        valid = false;
        idMovieInput.classList.add("error-input");
        errorIdMovie.innerText = errorFieldRequiredMessage;
    }

    if (!checkRequired(costInput.value)) {
        valid = false;
        costInput.classList.add("error-input");
        errorCost.innerText = errorFieldRequiredMessage;
    } else if (!checkNumber(costInput.value)) {
        valid = false;
        costInput.classList.add("error-input");
        errorCost.innerText = errorNumberFieldMessage;
    }else if(!checkNegativeNumber(costInput.value)){
        valid = false;
        costInput.classList.add("error-input");
        errorCost.innerText = errorNegativeNumberCodeMessage;
    }

    if (!checkRequired(amountInput.value)) {
        valid = false;
        amountInput.classList.add("error-input");
        errorAmount.innerText = errorFieldRequiredMessage;
    } else if (!checkNumber(amountInput.value)) {
        valid = false;
        amountInput.classList.add("error-input");
        errorAmount.innerText = errorNumberFieldMessage;
    }else if(!checkNegativeNumber(amountInput.value)){
        valid = false;
        amountInput.classList.add("error-input");
        errorAmount.innerText = errorNegativeNumberCodeMessage;
    }

    if (!valid) {
        errorSummary.innerText = errorSummaryFormMessage;
    }

    return valid;

}