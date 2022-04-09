function validateOrderForm() {
    const orderCodeInput = document.getElementById('orderCode');
    const clientNameInput = document.getElementById('clientName');
    const orderDateInput = document.getElementById('orderDate');
    const orderCostInput = document.getElementById('orderCost');
    const errorOrderCode = document.getElementById('errorOrderCode');
    const errorName = document.getElementById('errorName');
    const errorOrderDate = document.getElementById('errorOrderDate');
    const errorOrderCost = document.getElementById('errorOrderCost');
    const errorSummary = document.getElementById("errorSummary");
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
        errorName.innerText = "Pole jest wymagane";
    }

    if (!checkRequired(orderCodeInput.value)) {
        valid = false;
        orderCodeInput.classList.add("error-input");
        errorOrderCode.innerText = "Pole jest wymagane";
    } else if (!checkNumber(orderCodeInput.value)) {
        valid = false;
        orderCodeInput.classList.add("error-input");
        errorOrderCode.innerText = "Dane pole powinno być liczbą";
    }

    if (!checkRequired(orderDateInput.value)) {
        valid = false;
        orderDateInput.classList.add("error-input");
        errorOrderDate.innerText = "Pole jest wymagane";
    } else if (!checkDate(orderDateInput.value)) {
        valid = false;
        orderDateInput.classList.add("error-input");
        errorOrderDate.innerText = "Pole jest w złym formacie";
    } else if (!checkDateFuture(orderDateInput.value, nowDateString)) {
        valid = false;
        orderDateInput.classList.add("error-input");
        errorOrderDate.innerText = "Podana jest zła. Data nie może być późniejsza niż dzisiejsza";
    }

    if (!checkRequired(orderCostInput.value)) {
        valid = false;
        orderCostInput.classList.add("error-input");
        errorOrderCost.innerText = "Pole jest wymagane";
    } else if (!checkNumber(orderCostInput.value)) {
        valid = false;
        orderCostInput.classList.add("error-input");
        errorOrderCost.innerText = "Dane pole powinno być liczbą";
    }

    if (!valid) {
        errorSummary.innerText = "Formularz zawiera błędy";
    }

    return valid;

}