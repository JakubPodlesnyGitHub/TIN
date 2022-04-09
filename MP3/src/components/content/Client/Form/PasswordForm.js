import React from "react";
import {Redirect} from "react-router-dom";
import formMode from "../../../helpers/formHelper/formHelper";
import {
    getClientByIdApiCall,
    updateClientPasswordApiCall
} from "../../../../apiCalls/clientAPI/clientsApiCalls";
import {
    checkRequired
} from "../../../helpers/validationCommon";
import FormInput from "../../../helpers/formHelper/FormInput";
import FormButtons from "../../../helpers/formHelper/FormButtons";

class PasswordForm extends React.Component {

    constructor(props) {
        super(props);
        const paramsPasswordClientId = props.match.params.clientId;
        const currentFormMode = paramsPasswordClientId ? formMode.EDIT : formMode.NEW;

        this.state = {
            clientId: paramsPasswordClientId,
            myClient: {
                Password: '',
            },
            errors: {
                Password: '',
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

        if (fieldName === 'Password') {
            if (!checkRequired(fieldValue)) {
                errorMessage = "Pole jest wymagane";
            } /*else if (!checkPassword(fieldValue)) {
                errorMessage.innerText = "Hasło powinno zawierać co najmniej jedną cyfre i jedną dużą literę i jedną małą literę oraz min. 8 znaków";
            }*/
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
             if (currentFormMode === formMode.EDIT) {
                console.log(myClient)
                const clientId = this.state.clientId
                promise = updateClientPasswordApiCall(clientId, myClient)
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
            const notice = 'Pomyślnie Zaktualizowano Hasło Klienta'
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
        const pageTitle =  'Edycja Hasła Klienta'

        const globalErrorMessage = errorsSummary || fetchError || this.state.message;
        return (
            <main>
                <h2>{pageTitle}</h2>
                <form className="form" onSubmit={this.handleSubmit}>
                    <FormInput
                        type="text"
                        label="Password"
                        required
                        error={this.state.errors.Password}
                        name="Password"
                        placeholder="np. *******"
                        onChange={this.handleChange}
                    />

                    <FormButtons
                        formMode={this.state.formMode}
                        error={globalErrorMessage}
                        buttonLabel="Hasła Klienta"
                        cancelPath="/clients"
                    />
                </form>
            </main>
        )
    }
}

export default PasswordForm;