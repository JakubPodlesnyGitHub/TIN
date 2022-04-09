function validateMovieForm() {
    const titleInput = document.getElementById("Title");
    const movieTypeInput = document.getElementById("MovieType");
    const directorInput = document.getElementById("Director");
    const rateInput = document.getElementById("Rate");
    const releaseDateInput = document.getElementById("ReleaseDate");
    const oscarInput = document.getElementById("Oscar");
    const priceInput = document.getElementById("Price");
    const movieLengthInput = document.getElementById("MovieLength");

    const errorTitle = document.getElementById("errorTitle");
    const errorMovieType = document.getElementById("errorMovieType");
    const errorDirector = document.getElementById("errorDirector");
    const errorRate = document.getElementById("errorRate");
    const errorReleaseDate = document.getElementById("errorReleaseDate");
    const errorOscar = document.getElementById("errorOskar");
    const errorPrice = document.getElementById("errorPrice");
    const errorMovieLength = document.getElementById("errorMovieLength");
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

    resetErrors([titleInput, movieTypeInput, directorInput, rateInput, releaseDateInput, oscarInput, priceInput, movieLengthInput], [errorTitle, errorMovieType, errorDirector, errorRate, errorReleaseDate, errorOscar, errorPrice, errorMovieLength], errorSummary);
    let valid = true;
    let nowDate = new Date(), month = nowDate.getMonth() + 1, year = nowDate.getFullYear(), day = nowDate.getDay();
    if (month.length < 0) {
        month = '0' + month;
    }

    if (day.length < 2) {
        day = '0' + day;
    }

    const nowDateString = [year, month, day].join('-');


    if (!checkRequired(titleInput.value)) {
        valid = false;
        titleInput.classList.add("error-input");
        errorTitle.innerText = errorFieldRequiredMessage;
    }

    if (!checkRequired(movieTypeInput.value)) {
        valid = false;
        movieTypeInput.classList.add("error-input");
        errorMovieType.innerText = errorFieldRequiredMessage;
    }

    if (!checkRequired(directorInput.value)) {
        valid = false;
        directorInput.classList.add("error-input");
        errorDirector.innerText = errorFieldRequiredMessage;
    } else if (!checkDirector(directorInput.value)) {
        valid = false;
        directorInput.classList.add("error-input");
        errorDirector.innerText = errorDirectorMessage;
    }

    if (!checkRequired(rateInput.value)) {
        valid = false;
        rateInput.classList.add("error-input");
        errorRate.innerText = errorFieldRequiredMessage;
    }

    if (!checkRequired(releaseDateInput.value)) {
        valid = false;
        releaseDateInput.classList.add("error-input");
        errorReleaseDate.innerText = errorFieldRequiredMessage;
    } else if (!checkDate(releaseDateInput.value)) {
        valid = false;
        releaseDateInput.classList.add("error-input");
        errorReleaseDate.innerText = errorFormatDateMessage;
    } else if (!checkDateFuture(releaseDateInput.value, nowDateString)) {
        valid = false;
        releaseDateInput.classList.add("error-input");
        errorReleaseDate.innerText = errorFutureDateMessage;
    }

    if (!checkRequired(priceInput.value)) {
        valid = false;
        priceInput.classList.add("error-input");
        errorPrice.innerText = errorFieldRequiredMessage;
    } else if (!checkNumber(priceInput.value)) {
        valid = false;
        priceInput.classList.add("error-input");
        errorPrice.innerText = errorNumberFieldMessage;
    }else if(!checkNegativeNumber(priceInput.value)){
        valid = false;
        priceInput.classList.add("error-input");
        errorPrice.innerText = errorNegativeNumberCodeMessage;
    }

    if (movieLengthInput.value.length > 0) {
        if (!checkNumber(movieLengthInput.value)) {
            valid = false;
            movieLengthInput.classList.add("error-input");
            errorMovieLength.innerText = errorNumberFieldMessage;
        }else if(!checkNegativeNumber(movieLengthInput.value)){
            valid = false;
            priceInput.classList.add("error-input");
            errorPrice.innerText = errorNegativeNumberCodeMessage;
        }
    }

    if (!valid) {
        errorSummary.innerText = errorSummaryFormMessage;
    }

    return valid;
}