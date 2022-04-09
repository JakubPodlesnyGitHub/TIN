import React from "react";
import {Redirect} from "react-router-dom";
import formMode from "../../../helpers/formHelper/formHelper";
import {
    addClientApiCall,
    getClientByIdApiCall,
    updateClientApiCall
} from "../../../../apiCalls/clientAPI/clientsApiCalls";
import {
    checkPhoneNumber,
    checkRequired,
    checkTextLengthRange,
    checkZipCode
} from "../../../helpers/validationCommon";
import FormInput from "../../../helpers/formHelper/FormInput";
import FormButtons from "../../../helpers/formHelper/FormButtons";
import {getRolesApiCall} from "../../../../apiCalls/roleApi/roleApiCalls";

class ClientForm extends React.Component {

    constructor(props) {
        super(props);
        const paramsClientId = props.match.params.clientId;
        const currentFormMode = paramsClientId ? formMode.EDIT : formMode.NEW;

        this.state = {
            clientId: paramsClientId,
            myClient: {
                FirstName: '',
                LastName: '',
                PostCode: '',
                PhoneNumber: '',
                Login: '',
                Password: '',
                IdRole: ''
            },
            roles: [{
                IdRole: '',
                RoleName: ''
            }],
            errors: {
                FirstName: '',
                LastName: '',
                PostCode: '',
                PhoneNumber: '',
                Login: '',
                Password: '',
                IdRole: ''
            },
            formMode: currentFormMode,
            redirect: false,
            error: null
        }

    }

    componentDidMount = () => {
        const currentFormMode = this.state.formMode;
        if (currentFormMode === formMode.EDIT) {
            this.fetchClientDetails();
            this.fetchRoles();
        }
        if (currentFormMode === formMode.NEW) {
            this.fetchRoles();
        }
    }

    fetchClientDetails = () => {
        getClientByIdApiCall(this.state.clientId)
            .then(res => res.json())
            .then(
                (data) => {
                    if (data.message) {
                        this.setState({
                            message: data.message
                        })
                    } else {
                        this.setState({
                            myClient: data,
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

    fetchRoles = () => {
        getRolesApiCall().then(res => res.json())
            .then(
                (data) => {
                    this.setState({
                        roles: data
                    })
                })
    }

    handleChange = (event) => {
        const {name, value} = event.target;
        const myClient = {...this.state.myClient}
        myClient[name] = value

        const errorMessage = this.validateField(name, value);
        const errors = {...this.state.errors}
        errors[name] = errorMessage

        this.setState({
            myClient: myClient,
            errors: errors
        })
    }

    validateField = (fieldName, fieldValue) => {
        let errorMessage = '';
        if (fieldName === 'FirstName') {

            if (!checkRequired(fieldValue)) {
                errorMessage = "Pole jest wymagane";
            } else if (!checkTextLengthRange(fieldValue, 2, 60)) {
                errorMessage = "Pole powinno zawierać od 2 do 60 znaków";
            }
        }
        if (fieldName === 'LastName') {
            if (!checkRequired(fieldValue)) {
                errorMessage = "Pole jest wymagane";
            } else if (!checkTextLengthRange(fieldValue, 2, 60)) {
                errorMessage = "Pole powinno zawierać od 2 do 60 znaków";
            }
        }

        if (fieldName === 'PostCode') {
            if (!checkRequired(fieldValue)) {
                errorMessage = "Pole jest wymagane";
            } else if (!checkTextLengthRange(fieldValue, 6, 6)) {
                errorMessage = "Pole powinno zawierać 6 znaków";
            } else if (!checkZipCode(fieldValue)) {
                errorMessage = "Pole powinno zawierac poprawny Polski kod pocztowy";
            }
        }

        if (fieldName === 'PhoneNumber') {
            if (fieldValue.length > 0) {
                if (!checkTextLengthRange(fieldValue, 9, 9)) {
                    errorMessage = "Pole powinno zawierać 9 znaków";
                } else if (!checkPhoneNumber(fieldValue)) {
                    errorMessage = "Pole powinno zawierać same cyfry";
                }
            }
        }

        if (fieldName === 'Login') {
            if (!checkRequired(fieldValue)) {
                errorMessage = "Pole jest wymagane";
            }
        }

        if (fieldName === 'Password') {
            if (!checkRequired(fieldValue)) {
                errorMessage = "Pole jest wymagane";
            } /*else if (!checkPassword(fieldValue)) {
                errorMessage.innerText = "Hasło powinno zawierać co najmniej jedną cyfre i jedną dużą literę i jedną małą literę oraz min. 8 znaków";
            }*/
        }

        if (fieldName === 'IdRole') {
            if (!checkRequired(fieldValue)) {
                errorMessage = "Pole jest wymagane";
            }
        }

        return errorMessage;
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const isValid = this.validateForm()
        if (isValid) {
            const
                myClient = this.state.myClient,
                currentFormMode = this.state.formMode
            let
                promise,
                response;
            if (currentFormMode === formMode.NEW) {
                promise = addClientApiCall(myClient)

            } else if (currentFormMode === formMode.EDIT) {
                console.log(myClient)
                const clientId = this.state.clientId
                promise = updateClientApiCall(clientId, myClient)
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
        const myClient = this.state.myClient;
        const errors = this.state.errors;
        for (const fieldName in myClient) {
            const fieldValue = myClient[fieldName];
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
            const notice = currentFormMode === formMode.NEW ? 'Pomyślnie Dodano Nowego Klienta' : 'Pomyślnie Zaktualizowano Klienta'
            return (
                <Redirect to={{
                    pathname: "/clients/",
                    state: {
                        notice: notice
                    }
                }}/>
            )
        }

        const errorsSummary = this.hasErrors() ? 'Formularz zawiera błędy' : ''
        const fetchError = this.state.error ? `Błąd: ${this.state.error.message}` : ''
        const pageTitle = this.state.formMode === formMode.NEW ? 'Dodanie Nowego Klienta' : 'Edycja Klienta'

        const globalErrorMessage = errorsSummary || fetchError || this.state.message;
        return (
            <main>
                <h2>{pageTitle}</h2>
                <form className="form" onSubmit={this.handleSubmit}>

                    <FormInput
                        type="text"
                        label="Imię"
                        required
                        error={this.state.errors.FirstName}
                        name="FirstName"
                        placeholder="2-60 znaków"
                        onChange={this.handleChange}
                        class="symbol-required"
                        value={this.state.myClient.FirstName}
                    />

                    <FormInput
                        type="text"
                        label="Nazwisko"
                        required
                        error={this.state.errors.LastName}
                        name="LastName"
                        placeholder="2-60 znaków"
                        class="symbol-required"
                        onChange={this.handleChange}
                        value={this.state.myClient.LastName}
                    />

                    <FormInput
                        type="text"
                        label="Kod Pocztowy"
                        required
                        error={this.state.errors.PostCode}
                        name="PostCode"
                        placeholder="np. 00-000"
                        class="symbol-required"
                        onChange={this.handleChange}
                        value={this.state.myClient.PostCode}
                    />

                    <FormInput
                        type="text"
                        label="Tel"
                        required
                        error={this.state.errors.PhoneNumber}
                        name="PhoneNumber"
                        placeholder="np. 123123123"
                        onChange={this.handleChange}
                        value={this.state.myClient.PhoneNumber}
                    />

                    <FormInput
                        type="text"
                        label="Login"
                        required
                        error={this.state.errors.Login}
                        name="Login"
                        placeholder="np. client1"
                        onChange={this.handleChange}
                        value={this.state.myClient.Login}
                    />
                    {(this.state.formMode == formMode.NEW) &&
                    <FormInput
                        type="text"
                        label="Password"
                        required
                        error={this.state.errors.Password}
                        name="Password"
                        placeholder="np. *******"
                        onChange={this.handleChange}
                        value={this.state.myClient.Password}
                    />
                    }

                    <label htmlFor="IdRole">Rola: <abbr title="required" aria-label="required"
                                                        className="symbol-required"> *</abbr></label>
                    <select name="IdRole" id="IdRole" value={this.state.myClient.IdRole} onChange={this.handleChange} required>
                        <option value="">--Wbierz Role Dla Klienta--</option>
                        {this.state.roles.map(rol =>
                            (<option key={rol.IdRole}
                                     value={rol.IdRole}>{rol.RoleName}</option>)
                        )}
                    </select>
                    <span id="errorRole" className="errors-text"></span>

                    <FormButtons
                        formMode={this.state.formMode}
                        error={globalErrorMessage}
                        buttonLabel="Klienta"
                        cancelPath="/clients"
                    />
                </form>
            </main>
        )
    }
}

export default ClientForm;