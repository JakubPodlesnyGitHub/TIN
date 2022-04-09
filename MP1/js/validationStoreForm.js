function validateStoreForm() {
    const orderCodeInput = document.getElementById('orderCode');
    const movieInput = document.getElementById('movie');
    const costInput = document.getElementById('cost');
    const amountInput = document.getElementById('movieAmount');
    const errorOrderCode = document.getElementById('errorOrderCode');
    const errorMovie = document.getElementById('errorMovie');
    const errorCost = document.getElementById('errorCost');
    const errorAmount = document.getElementById('errorAmount');
    const errorSummary = document.getElementById('errorSummary');
    let valid = true;

    if (!checkRequired(orderCodeInput.value)) {
        valid = false;
        orderCodeInput.classList.add("error-input");
        errorOrderCode.innerText = "Pole jest wymagane";
    }

    if (!checkRequired(movieInput.value)) {
        valid = false;
        movieInput.classList.add("error-input");
        errorMovie.innerText = "Pole jest wymagane";
    }

    if (!checkRequired(costInput.value)) {
        valid = false;
        costInput.classList.add("error-input");
        errorCost.innerText = "Pole jest wymagane";
    } else if (!checkNumber(costInput.value)) {
        valid = false;
        costInput.classList.add("error-input");
        errorCost.innerText = "Dane pole powinno być liczbą";
    }

    if (!checkRequired(amountInput.value)) {
        valid = false;
        amountInput.classList.add("error-input");
        errorAmount.innerText = "Pole jest wymagane";
    } else if (!checkNumber(amountInput.value)) {
        valid = false;
        amountInput.classList.add("error-input");
        errorAmount.innerText = "Dane pole powinno być liczbą";
    }

    if (!valid) {
        errorSummary.innerText = "Formularz zawiera błędy";
    }

    return valid;

}