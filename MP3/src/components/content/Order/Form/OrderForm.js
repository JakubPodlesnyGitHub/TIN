import React from "react";
import {Redirect} from "react-router-dom";
import {getClientsApiCall} from "../../../../apiCalls/clientAPI/clientsApiCalls";
import formMode from "../../../helpers/formHelper/formHelper";
import {
    addOrderApiCall,
    getOrderByIdApiCall,
    getOrdersApiCall,
    updateOrderApiCall
} from "../../../../apiCalls/orderAPI/orderApiCalls";
import {
    checkDate, checkDateFuture,
    checkNegativeNumber,
    checkNumber,
    checkRequired
} from "../../../helpers/validationCommon";
import FormInput from "../../../helpers/formHelper/FormInput";
import FormButtons from "../../../helpers/formHelper/FormButtons";

class OrderForm extends React.Component {


    constructor(props) {
        super(props);
        const paramsOrderId = props.match.params.orderId;
        const currentFormMode = paramsOrderId ? formMode.EDIT : formMode.NEW;

        this.state = {
            orderId: paramsOrderId,
            order: {
                OrderCode: '',
                IdClient: '',
                OrderDate: new Date(),
                DeliveryCost: '',
                clients: {
                    FirstName: '',
                    LastName: '',
                    PostCode: '',
                    PhoneNumber: '',
                    Login: '',
                    Password: '',
                    IdRole: ''
                }
            },
            errors: {
                OrderCode: '',
                IdClient: '',
                OrderDate: '',
                DeliveryCost: '',
            },
            cli: [{
                FirstName: '',
                LastName: '',
                PostCode: '',
                PhoneNumber: '',
                Login: '',
                Password: '',
                IdRole: ''
            }],
            formMode: currentFormMode,
            redirect: false,
            error: null
        }

    }

    componentDidMount = () => {
        const currentFormMode = this.state.formMode;
        if (currentFormMode === formMode.EDIT) {
            this.fetchOrderDetails()
            this.fetchClients();
        }
        if (currentFormMode === formMode.NEW) {
            this.fetchClients();
        }
    }

    fetchOrderDetails = () => {
        getOrderByIdApiCall(this.state.orderId)
            .then(res => res.json())
            .then(
                (data) => {
                    if (data.message) {
                        this.setState({
                            message: data.message
                        })
                    } else {
                        this.setState({
                            order: data,
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
                })
    }

    fetchClients = () => {
        getClientsApiCall().then(res => res.json())
            .then(
                (data) => {
                    this.setState({
                        cli: data
                    })
                })
    }

    handleChange = (event) => {
        const {name, value} = event.target;
        const order = {...this.state.order}
        order[name] = value

        const errorMessage = this.validateField(name, value);
        const errors = {...this.state.errors}
        errors[name] = errorMessage

        this.setState({
            order: order,
            errors: errors
        })
    }

    validateField = (fieldName, fieldValue) => {
        let errorMessage = '';
        if (fieldName === 'OrderCode') {
            if (!checkRequired(fieldValue)) {
                errorMessage = "Pole jest wymagane";
            } else if (!checkNumber(fieldValue)) {
                errorMessage = "Pole powinno być liczbą";
            }
        }

        if (fieldName === 'IdClient') {
            if (!checkRequired(fieldValue)) {
                errorMessage = "Pole jest wymagane";
            }
        }

        if (fieldName === 'OrderDate') {
            if (!checkRequired(fieldValue)) {
                errorMessage = "Pole jest wymagane";
            } else if (!checkDate(fieldValue)) {
                errorMessage = "Zły format";
            } else if (!checkDateFuture(fieldValue,Date.now())) {
                errorMessage = "Data nie może być późniejsza niż dzisiejsza"
            }
        }

        if (fieldName === 'DeliveryCost') {
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
                order = this.state.order,
                currentFormMode = this.state.formMode
            let
                promise,
                response;
            if (currentFormMode === formMode.NEW) {
                promise = addOrderApiCall(order)

            } else if (currentFormMode === formMode.EDIT) {
                console.log(order)
                const orderId = this.state.orderId
                promise = updateOrderApiCall(orderId, order)
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
        const order = this.state.order;
        const errors = this.state.errors;
        for (const fieldName in order) {
            const fieldValue = order[fieldName];
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
            const notice = currentFormMode === formMode.NEW ? 'Pomyślnie dodano nowe zamówienie' : 'Pomyślnie zakutalizowano dane zamówienia'
            return (
                <Redirect to={{
                    pathname: "/orders/",
                    state: {
                        notice: notice
                    }
                }}/>
            )
        }

        const errorsSummary = this.hasErrors() ? 'Formularz zawiera błędy' : ''
        const fetchError = this.state.error ? `Błąd: ${this.state.error.message}` : ''
        const pageTitle = this.state.formMode === formMode.NEW ? 'Dodanie Nowego Zamówienia' : 'Edycja Zamówienia'

        const globalErrorMessage = errorsSummary || fetchError || this.state.message;
        return (
            <main>
                <h2>{pageTitle}</h2>
                <form action="/orders" className="form" onSubmit={this.handleSubmit}>

                    <label htmlFor="IdClient">Imie i Nazwisko Klienta: <span className="symbol-required">*</span></label>
                    <select name="IdClient" id="IdClient"
                            value={this.state.order.clients.IdClient}
                            onChange={this.handleChange} required>
                        <option value="">--Wbierz Klienta--</option>
                        {this.state.cli.map(c =>
                            (<option key={c.IdClient}
                                     value={c.IdClient}>{c.FirstName + ' ' + c.LastName}</option>)
                        )}
                    </select>
                    <span id="errorIdClient" className="errors-text"></span>

                    <FormInput
                        type="text"
                        label="Kod Zamówienia"
                        required
                        error={this.state.errors.OrderCode}
                        name="OrderCode"
                        placeholder="np. 12345"
                        onChange={this.handleChange}
                        class="symbol-required"
                        value={this.state.order.OrderCode}
                    />

                    <FormInput
                        type="date"
                        label="Data Zamówienia"
                        required
                        error={this.state.errors.OrderDate}
                        name="OrderDate"
                        placeholder=""
                        class="symbol-required"
                        onChange={this.handleChange}
                        value={new Date(this.state.order.OrderDate).toISOString().split('T')[0]}
                    />

                    <FormInput
                        type="number"
                        label="Koszt Dostawy"
                        required
                        error={this.state.errors.DeliveryCost}
                        name="DeliveryCost"
                        placeholder="nps. 123"
                        class="symbol-required"
                        onChange={this.handleChange}
                        value={this.state.order.DeliveryCost}
                    />

                    <FormButtons
                        formMode={this.state.formMode}
                        error={globalErrorMessage}
                        buttonLabel="Zamówienie"
                        cancelPath="/orders"
                    />
                </form>
            </main>
        )
    }
}

export default OrderForm;