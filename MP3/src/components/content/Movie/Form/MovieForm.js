import React from "react";
import {Redirect} from "react-router-dom";
import formMode from "../../../helpers/formHelper/formHelper";
import {addMovieApiCall, getMovieByIdApiCall} from "../../../../apiCalls/movieAPI/movieApiCalls";
import {
    checkDate, checkDateFuture,
    checkDirector, checkNegativeNumber, checkNumber,
    checkRequired
} from "../../../helpers/validationCommon";
import {updateClientApiCall} from "../../../../apiCalls/clientAPI/clientsApiCalls";
import FormInput from "../../../helpers/formHelper/FormInput";
import FormButtons from "../../../helpers/formHelper/FormButtons";

class MovieForm extends React.Component {

    constructor(props) {
        super(props);
        const paramsMovieId = props.match.params.movieId;
        const currentFormMode = paramsMovieId ? formMode.EDIT : formMode.NEW;
        this.state = {
            movieId: paramsMovieId,
            allRates: [
                {value: 1, label: 1},
                {value: 2, label: 2},
                {value: 3, label: 3},
                {value: 4, label: 4},
                {value: 5, label: 5},
                {value: 6, label: 6},
                {value: 7, label: 7},
                {value: 8, label: 8},
                {value: 9, label: 9},
                {value: 10, label: 10}
            ],
            movie: {
                Title: '',
                MovieType: '',
                Director: '',
                Rate: '',
                ReleaseDate: new Date(),
                Oscar: '',
                Price: '',
                MovieLength: ''
            },
            errors: {
                Title: '',
                MovieType: '',
                Director: '',
                Rate: '',
                ReleaseDate: '',
                Oscar: '',
                Price: '',
                MovieLength: ''
            },
            formMode: currentFormMode,
            redirect: false,
            error: null
        }
    }

    componentDidMount() {
        const currentFormMode = this.state.formMode;
        if (currentFormMode === formMode.EDIT) {
            this.fetchMoviesDetails();
        }
        /*if (currentFormMode === formMode.NEW) {
            this.fetchRoles();
        }*/
    }

    fetchMoviesDetails = () => {
        getMovieByIdApiCall(this.state.movieId).then(res => res.json())
            .then(
                (data) => {
                    if (data.message) {
                        this.setState({
                            message: data.message
                        })
                    } else {
                        this.setState({
                            movie: data,
                            message: null
                        })
                    }
                    this.setState({
                        isLoaded: true,
                    })
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    })
                }
            )
    }

    handleChange = (event) => {
        const {name, value} = event.target;
        const movie = {...this.state.movie}
        movie[name] = value

        const errorMessage = this.validateField(name, value);
        const errors = {...this.state.errors}
        errors[name] = errorMessage

        this.setState({
            movie: movie,
            errors: errors
        })
    }


    validateField = (fieldName, fieldValue) => {
        let errorMessage = '';
        if (fieldName === 'Title') {
            if (!checkRequired(fieldValue)) {
                errorMessage = "Pole jest wymagane";
            }
        }

        if (fieldName === 'MovieType') {
            if (!checkRequired(fieldValue)) {
                errorMessage = "Pole jest wymagane";
            }
        }

        if (fieldName === 'Director') {
            if (!checkRequired(fieldValue)) {
                errorMessage = "Pole jest wymagane";
            } else if (!checkDirector(fieldValue)) {
                errorMessage = "Pole powinno zawierać dwa słowa -> Imie i Nazwisko";
            }
        }

        if (fieldName === 'Rate') {
            if (!checkRequired(fieldValue)) {
                errorMessage = "Pole jest wymagane";
            }
        }

        if (fieldName === 'ReleaseDate') {
            if (!checkRequired(fieldValue)) {
                errorMessage = "Pole jest wymagane";
            } else if (!checkDate(fieldValue)) {
                errorMessage = "Zły format";
            } else if (!checkDateFuture(fieldValue,Date.now())) {
                errorMessage = "Data nie może być późniejsza niż dzisiejsza"
            }
        }


        if (fieldName === 'Price') {
            if (!checkRequired(fieldValue)) {
                errorMessage = "Pole jest wymagane";
            } else if (!checkNumber(fieldValue)) {
                errorMessage.innerText = "Pole powinno być liczbą";
            } else if (!checkNegativeNumber(fieldValue)) {
                errorMessage.innerText = "Pole nie może być ujemne";
            }
        }

        if (fieldName === 'MovieLength') {
            if (fieldValue.length > 0) {
                if (!checkNumber(fieldValue)) {
                    errorMessage.innerText = "Pole powinno być liczbą";
                } else if (!checkNegativeNumber(fieldValue)) {
                    errorMessage.innerText = "Pole nie może być ujemne";
                }
            }
        }

        return errorMessage;
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const isValid = this.validateForm()
        if (isValid) {
            const
                movie = this.state.movie,
                currentFormMode = this.state.formMode
            let
                promise,
                response;
            if (currentFormMode === formMode.NEW) {
                promise = addMovieApiCall(movie)

            } else if (currentFormMode === formMode.EDIT) {
                console.log(movie)
                const movieId = this.state.movieId
                promise = updateClientApiCall(movieId, movie)
            }
            if (promise) {
                promise
                    .then(
                        (data) => {
                            response = data
                            if (response.status === 201 || response.status === 500) {
                                return data.json()
                            }
                        })
                    .then(
                        (data) => {
                            if (!response.ok && response.status === 500) {
                                console.log(data)
                                for (const i in data) {
                                    const errorItem = data[i]
                                    const errorMessage = errorItem.message
                                    const fieldName = errorItem.path
                                    const errors = {...this.state.errors}
                                    errors[fieldName] = errorMessage
                                    this.setState({
                                        errors: errors,
                                        error: null
                                    })
                                }
                            } else {
                                this.setState({redirect: true})
                            }
                        },
                        (error) => {
                            this.setState({error})
                            console.log(error)
                        }
                    )
            }
        }
    }

    validateForm = () => {
        const movie = this.state.movie;
        const errors = this.state.errors;
        for (const fieldName in movie) {
            const fieldValue = movie[fieldName];
            const errorMessage = this.validateField(fieldName, fieldValue);
            errors[fieldName] = errorMessage;
        }
        this.setState({
            errors: errors
        })
        return !this.hasErrors()
    }

    hasErrors = () => {
        const errors = this.state.errors;
        for (const errorFiled in this.state.errors) {
            if (errors[errorFiled].length > 0)
                return true;
        }
        return false;
    }

    render() {


        const {redirect} = this.state
        if (redirect) {
            const currentFormMode = this.state.formMode
            const notice = currentFormMode === formMode.NEW ? 'Pomyślnie dodano nowy film' : 'Pomyślnie zaktualizowano film'
            return (
                <Redirect to={{
                    pathname: "/movies/",
                    state: {
                        notice: notice
                    }
                }}/>
            )
        }

        const errorsSummary = this.hasErrors() ? 'Formularz zawiera błędy' : ''
        const fetchError = this.state.error ? `Błąd: ${this.state.error.message}` : ''
        const pageTitle = this.state.formMode === formMode.NEW ? 'Dodawanie Nowgo Filmu' : 'Edycja Filmu'

        const globalErrorMessage = errorsSummary || fetchError || this.state.message;
        return (
            <main>
                <h2>{pageTitle}</h2>
                <form className="form" onSubmit={this.handleSubmit}>
                    <FormInput
                        type="text"
                        label="Tytuł"
                        required
                        error={this.state.errors.Title}
                        name="Title"
                        placeholder="np. Lord Of The Rings"
                        onChange={this.handleChange}
                        value={this.state.movie.Title}
                    />
                    <FormInput
                        type="text"
                        label="Gatunek Filmu"
                        required
                        error={this.state.errors.MovieType}
                        name="MovieType"
                        placeholder="np. Fabularny"
                        onChange={this.handleChange}
                        value={this.state.movie.MovieType}
                    />
                    <FormInput
                        type="text"
                        label="Reżyser"
                        required
                        error={this.state.errors.Director}
                        name="Director"
                        placeholder="np. Peter Jackson"
                        onChange={this.handleChange}
                        value={this.state.movie.Director}
                    />
                    <label htmlFor="Rate">Ocena: <abbr title="required" aria-label="required"
                                                       className="symbol-required"> *</abbr></label>
                    <select name="Rate" id="Rate" value={this.state.movie.Rate} onChange={this.handleChange} required>
                        <option value="">--Wbierz Ocene--</option>
                        {this.state.allRates.map(rate =>
                            (<option key={rate.value}
                                     value={rate.value}>{rate.value}</option>)
                        )}
                    </select>
                    <span id="errorRate" className="errors-text"></span>

                    <FormInput
                        type="date"
                        label="Data Premiery"
                        required
                        error={this.state.errors.ReleaseDate}
                        name="ReleaseDate"
                        placeholder=""
                        onChange={this.handleChange}
                        value={new Date(this.state.movie.ReleaseDate).toISOString().split('T')[0]}
                    />
                    <label htmlFor="Rate">Oskar: </label>
                    <select name="Oscar" id="Oscar" value={this.state.movie.Oscar} onChange={this.handleChange} required>
                        <option value="">--Wbierz Ocene--</option>
                        <option value={true}>TAK</option>
                        <option value={false}>NIE</option>
                    </select>
                    <span id="errorOscar" className="errors-text"></span>

                    <FormInput
                        type="number"
                        label="Cena"
                        required
                        error={this.state.errors.Price}
                        name="Price"
                        placeholder="np . 154"
                        onChange={this.handleChange}
                        value={this.state.movie.Price}
                    />
                    <FormInput
                        type="number"
                        label="Długość filmu"
                        error={this.state.errors.MovieLength}
                        name="MovieLength"
                        placeholder="np . 200"
                        onChange={this.handleChange}
                        value={this.state.movie.MovieLength}
                    />

                    <FormButtons
                        formMode={this.state.formMode}
                        error={globalErrorMessage}
                        buttonLabel="Film"
                        cancelPath="/movies"
                    />
                </form>
            </main>
        )
    }
}

export default MovieForm;