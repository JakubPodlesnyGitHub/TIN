function validateOrderForm() {
    const orderCodeInput = document.getElementById('OrderCode');
    const clientNameInput = document.getElementById('IdClient');
    const orderDateInput = document.getElementById('OrderDate');
    const deliveryCostInput = document.getElementById('DeliveryCost');

    const errorOrderCode = document.getElementById('errorOrderCode');
    const errorIdClient = document.getElementById('errorIdClient');
    const errorOrderDate = document.getElementById('errorOrderDate');
    const errorDeliveryCost = document.getElementById('errorDeliveryCost');
    const errorSummary = document.getElementById("errorSummary");

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

    resetErrors([orderCodeInput, clientNameInput, orderDateInput, deliveryCostInput], [errorOrderCode, errorIdClient, errorOrderDate, errorDeliveryCost], errorSummary);
    let valid = true;
    let nowDate = new Date(), month = nowDate.getMonth() + 1, year = nowDate.getFullYear(), day = nowDate.getDay();
    if (month.length < 0) {
        month = '0' + month;
    }
    if (day.length < 2) {
        day = '0' + day;
    }
    const nowDateString = [year, month, day].join('-');

    if (!checkRequired(clientNameInput.value)) {
        valid = false;
        clientNameInput.classList.add("error-input");
        errorIdClient.innerText = errorFieldRequiredMessage;
    }

    if (!checkRequired(orderCodeInput.value)) {
        valid = false;
        orderCodeInput.classList.add("error-input");
        errorOrderCode.innerText = errorFieldRequiredMessage;
    } else if (!checkNumber(orderCodeInput.value)) {
        valid = false;
        orderCodeInput.classList.add("error-input");
        errorOrderCode.innerText = errorNumberFieldMessage;
    }

    if (!checkRequired(orderDateInput.value)) {
        valid = false;
        orderDateInput.classList.add("error-input");
        errorOrderDate.innerText = errorFieldRequiredMessage;
    } else if (!checkDate(orderDateInput.value)) {
        valid = false;
        orderDateInput.classList.add("error-input");
        errorOrderDate.innerText = errorFormatDateMessage;
    } else if (!checkDateFuture(orderDateInput.value, nowDateString)) {
        valid = false;
        orderDateInput.classList.add("error-input");
        errorOrderDate.innerText = errorFutureDateMessage;
    }

    if (!checkRequired(deliveryCostInput.value)) {
        valid = false;
        deliveryCostInput.classList.add("error-input");
        errorDeliveryCost.innerText = errorFieldRequiredMessage;
    } else if (!checkNumber(deliveryCostInput.value)) {
        valid = false;
        deliveryCostInput.classList.add("error-input");
        errorDeliveryCost.innerText = errorNumberFieldMessage;
    }else if(!checkNegativeNumber(deliveryCostInput.value)){
        valid = false;
        deliveryCostInput.classList.add("error-input");
        errorDeliveryCost.innerText = errorNegativeNumberCodeMessage;
    }

    if (!valid) {
        errorSummary.innerText = errorSummaryFormMessage;
    }

    return valid;

}