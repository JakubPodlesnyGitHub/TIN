import React from "react";
import {Redirect} from "react-router-dom";
import {getMoviesApiCall} from "../../../../apiCalls/movieAPI/movieApiCalls";
import formMode from "../../../helpers/formHelper/formHelper";
import {addStoreApiCall, getStoreByIdApiCall, updateStoreApiCall} from "../../../../apiCalls/storeAPI/storeApiCalls";
import {
    checkNegativeNumber,
    checkNumber,
    checkRequired
} from "../../../helpers/validationCommon";
import FormInput from "../../../helpers/formHelper/FormInput";
import FormButtons from "../../../helpers/formHelper/FormButtons";
import {getOrdersApiCall} from "../../../../apiCalls/orderAPI/orderApiCalls";

class StoreForm extends React.Component {


    constructor(props) {
        super(props);
        const paramsStoreId = props.match.params.storeId;
        //console.log(this.state.storeId)
        const currentFormMode = paramsStoreId ? formMode.EDIT : formMode.NEW;
        this.state = {
            storeId: paramsStoreId,
            store: {
                IdOrder: '',
                IdMovie: '',
                Cost: '',
                Amount: '',
                Movies: {
                    Title: '',
                    MovieType: '',
                    Director: '',
                    Rate: '',
                    ReleaseDate: '',
                    Oscar: '',
                    Price: '',
                    MovieLength: ''
                },
                Orders: {
                    OrderCode: '',
                    IdClient: '',
                    OrderDate: '',
                    DeliveryCost: '',
                }
            },
            errors: {
                IdOrder: '',
                IdMovie: '',
                Cost: '',
                Amount: '',
                Movies: {
                    Title: '',
                    MovieType: '',
                    Director: '',
                    Rate: '',
                    ReleaseDate: '',
                    Oscar: '',
                    Price: '',
                    MovieLength: ''
                },
                Orders: {
                    OrderCode: '',
                    IdClient: '',
                    OrderDate: '',
                    DeliveryCost: '',
                }
            },
            orders: [{
                OrderCode: '',
                IdClient: '',
                OrderDate: '',
                DeliveryCost: ''
            }],
            movies: [{
                Title: '',
                MovieType: '',
                Director: '',
                Rate: '',
                ReleaseDate: '',
                Oscar: '',
                Price: '',
                MovieLength: ''
            }],
            formMode: currentFormMode,
            redirect: false,
            error: null

        }
    }

    componentDidMount = () => {
        const currentFormMode = this.state.formMode;
        if (currentFormMode === formMode.EDIT) {
            this.fetchStoreDetails()
            this.fetchOrders();
            this.fetchMovies();
        }
        if (currentFormMode === formMode.NEW) {
            this.fetchOrders();
            this.fetchMovies();
        }
    }

    fetchStoreDetails = () => {
        getStoreByIdApiCall(this.state.storeId).then(res => res.json())
            .then(
                (data) => {
                    if (data.message) {
                        this.setState({
                            message: data.message
                        })
                    } else {
                        this.setState({
                            store: data,
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

    fetchOrders = () => {
        getOrdersApiCall().then(res => res.json())
            .then(
                (data) => {
                    this.setState({
                        orders: data
                    })
                })
    }

    fetchMovies = () => {
        getMoviesApiCall().then(res => res.json())
            .then(
                (data) => {
                    this.setState({
                        movies: data
                    })
                })
    }

    handleChange = (event) => {
        const {name, value} = event.target;
        const store = {...this.state.store}
        store[name] = value

        const errorMessage = this.validateField(name, value);
        const errors = {...this.state.errors}
        errors[name] = errorMessage

        this.setState({
            store: store,
            errors: errors
        })
    }

    validateField = (fieldName, fieldValue) => {
        let errorMessage = '';
        if (fieldName === 'IdOrder') {
            if (!checkRequired(fieldValue)) {
                errorMessage = "Pole jest wymagane";
            }
        }

        if (fieldName === 'IdMovie') {
            if (!checkRequired(fieldValue)) {
                errorMessage = "Pole jest wymagane";
            }
        }

        if (fieldName === 'Cost') {
            if (!checkRequired(fieldValue)) {
                errorMessage = "Pole jest wymagane";
            } else if (!checkNumber(fieldValue)) {
                errorMessage = "Pole powinno być liczbą";
            } else if (!checkNegativeNumber(fieldValue)) {
                errorMessage = "Pole nie może być ujemne"
            }
        }

        if (fieldName === 'Amount') {
            if (!checkRequired(fieldValue)) {
                errorMessage = "Pole jest wymagane";
            } else if (!checkNumber(fieldValue)) {
                errorMessage = "Pole powinno być liczbą";
            } else if (!checkNegativeNumber(fieldValue)) {
                errorMessage = "Pole nie może być ujemne"
            }
        }

        return errorMessage;
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const isValid = this.validateForm()
        if (isValid) {
            const
                store = this.state.store,
                currentFormMode = this.state.formMode
            let
                promise,
                response;
            if (currentFormMode === formMode.NEW) {
                promise = addStoreApiCall(store)

            } else if (currentFormMode === formMode.EDIT) {
                console.log(store)
                const storeId = this.state.storeId
                promise = updateStoreApiCall(storeId, store)
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
        const store = this.state.storeId;
        const errors = this.state.errors;
        for (const fieldName in store) {
            const fieldValue = store[fieldName];
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
            const notice = currentFormMode === formMode.NEW ? 'Pomyślnie Dodano Nowy Produkt Do Zamówienia' : 'Pomyślnie Zaktualizowano Produkt W Zamówieniu'
            return (
                <Redirect to={{
                    pathname: "/store/",
                    state: {
                        notice: notice
                    }
                }}/>
            )
        }

        const errorsSummary = this.hasErrors() ? 'Formularz zawiera błędy' : ''
        const fetchError = this.state.error ? `Błąd: ${this.state.error.message}` : ''
        const pageTitle = this.state.formMode === formMode.NEW ? 'Dodanie Produktu Do Zamówienia' : 'Edycja Produktu W Zamówieniu'

        const globalErrorMessage = errorsSummary || fetchError || this.state.message;
        return (
            <main>
                <h2>{pageTitle}</h2>
                <form className="form" onSubmit={this.handleSubmit}>
                    <label htmlFor="IdOrder">Zamówienie: <abbr title="required" aria-label="required"
                                                               className="symbol-required"> *</abbr></label>
                    <select name="IdOrder" id="IdOrder" value={this.state.store.Orders.IdOrder}
                            onChange={this.handleChange} required>
                        <option value="">--Wbierz Zamówienie--</option>
                        {this.state.orders.map(order =>
                            (<option key={order.IdOrder}
                                     value={order.IdOrder}>{order.OrderCode}</option>)
                        )}
                    </select>
                    <span id="errorOrder" className="errors-text"></span>

                    <label htmlFor="IdMovie">Film: <abbr title="required" aria-label="required"
                                                         className="symbol-required"> *</abbr></label>
                    <select name="IdMovie" id="IdMovie" value={this.state.store.Movies.IdMovie}
                            onChange={this.handleChange} required>
                        <option value="">--Wbierz Film--</option>
                        {this.state.movies.map(movie =>
                            (<option key={movie.IdMovie}
                                     value={movie.IdMovie}>{movie.Title}</option>)
                        )}
                    </select>
                    <span id="errorOrder" className="errors-text"></span>

                    <FormInput
                        type="number"
                        label="Koszt Zamówienia"
                        required
                        error={this.state.errors.Cost}
                        name="Cost"
                        placeholder="np. 152"
                        onChange={this.handleChange}
                        value={this.state.store.Cost}
                    />

                    <FormInput
                        type="number"
                        label="Ilość"
                        required
                        error={this.state.errors.Amount}
                        name="Amount"
                        placeholder="np. 150"
                        onChange={this.handleChange}
                        value={this.state.store.Amount}
                    />

                    <FormButtons
                        formMode={this.state.formMode}
                        error={globalErrorMessage}
                        buttonLabel="Proukt W Zamówienu"
                        cancelPath="/store"
                    />
                </form>
            </main>
        )
    }
}

export default StoreForm;