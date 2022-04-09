function validateMovieForm() {
    const titleInput = document.getElementById("title");
    const movieTypeInput = document.getElementById("movieType");
    const directorInput = document.getElementById("director");
    const rateInput = document.getElementById("rate");
    const releaseDateInput = document.getElementById("releaseDate");
    const oscarInput = document.getElementById("oscar");
    const priceInput = document.getElementById("price");
    const movieLengthInput = document.getElementById("movieLength");
    const errorTitle = document.getElementById("errorTitle");
    const errorMovieType = document.getElementById("errorMovieType");
    const errorDirector = document.getElementById("errorDirector");
    const errorRate = document.getElementById("errorRate");
    const errorReleaseDate = document.getElementById("errorReleaseDate");
    const errorOscar = document.getElementById("errorOskar");
    const errorPrice = document.getElementById("errorPrice");
    const errorMovieLength = document.getElementById("errorMovieLength");
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


    if (!checkRequired(titleInput.value)) {
        valid = false;
        titleInput.classList.add("error-input");
        errorTitle.innerText = "Pole jest wymagane";
    }

    if (!checkRequired(movieTypeInput.value)) {
        valid = false;
        movieTypeInput.classList.add("error-input");
        errorMovieType.innerText = "Pole jest wymagane";
    }

    if (!checkRequired(directorInput.value)) {
        valid = false;
        directorInput.classList.add("error-input");
        errorDirector.innerText = "Pole jest wymagane";
    } else if (!checkDirector(directorInput.value)) {
        valid = false;
        directorInput.classList.add("error-input");
        errorDirector.innerText = "Pole powinno zawierać dwa słowa -> Imie i Nazwisko";
    }

    if (!checkRequired(rateInput.value)) {
        valid = false;
        rateInput.classList.add("error-input");
        errorRate.innerText = "Pole jest wymagane";
    }

    if (!checkRequired(releaseDateInput.value)) {
        valid = false;
        releaseDateInput.classList.add("error-input");
        errorReleaseDate.innerText = "Pole jest wymagane";
    } else if (!checkDate(releaseDateInput.value)) {
        valid = false;
        releaseDateInput.classList.add("error-input");
        errorReleaseDate.innerText = "Pole jest w złym formacie";
    } else if (!checkDateFuture(releaseDateInput.value, nowDateString)) {
        valid = false;
        releaseDateInput.classList.add("error-input");
        errorReleaseDate.innerText = "Podana jest zła. Data nie może być późniejsza niż dzisiejsza";
    }

    if (!checkRequired(priceInput.value)) {
        valid = false;
        priceInput.classList.add("error-input");
        errorPrice.innerText = "Pole jest wymagane";
    } else if (!checkNumber(priceInput.value)) {
        valid = false;
        priceInput.classList.add("error-input");
        errorPrice.innerText = "Dane pole powinno być liczbą";
    }

    if (!checkRequired(movieLengthInput.value)) {
        valid = false;
        movieLengthInput.classList.add("error-input");
        errorMovieLength.innerText = "Pole jest wymagane";
    } else if (!checkNumber(movieLengthInput.value)) {
        valid = false;
        movieLengthInput.classList.add("error-input");
        errorMovieLength.innerText = "Dane pole powinno być liczbą";
    }

    if (!valid) {
        errorSummary.innerText = "Formularz zawiera błędy";
    }

    return valid;
}