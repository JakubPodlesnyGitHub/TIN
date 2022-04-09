import React from "react";
import {Redirect} from "react-router-dom";
import formMode from "../../../helpers/formHelper/formHelper";
import {addGroupApiCall, getGroupByIdApiCall, updateGroupApiCall} from "../../../../apiCalls/groupApi/groupApiCalls";
import {
    checkRequired,
    checkTextLengthRange
} from "../../../helpers/validationCommon";
import {getClientsApiCall} from "../../../../apiCalls/clientAPI/clientsApiCalls";
import FormInput from "../../../helpers/formHelper/FormInput";
import FormButtons from "../../../helpers/formHelper/FormButtons";

class GroupForm extends React.Component {

    constructor(props) {
        super(props);
        const paramsGroupId = props.match.params.groupId;
        const currentFormMode = paramsGroupId ? formMode.EDIT : formMode.NEW;
        this.state = {
            groupId: paramsGroupId,
            group: {
                GroupName: '',
                CreationDate: '',
                Description: '',
                GroupOwner: ''
            },
            clients: [{
                FirstName: '',
                LastName: '',
                PostCode: '',
                PhoneNumber: '',
                Login: '',
                Password: '',
                IdRole: ''
            }],
            errors: {
                GroupName: '',
                CreationDate: '',
                Description: '',
                GroupOwner: ''
            },
            formMode: currentFormMode,
            redirect: false,
            error: null
        }
    }


    componentDidMount() {
        const currentFormMode = this.state.formMode;
        if (currentFormMode === formMode.EDIT) {
            this.fetchGroupsDetails();
            this.fetchClients();
        }
        if (currentFormMode === formMode.NEW) {
            this.fetchClients();
        }
    }

    fetchGroupsDetails = () => {
        getGroupByIdApiCall(this.state.groupId).then(res => res.json())
            .then(
                (data) => {
                    if (data.message) {
                        this.setState({
                            message: data.message
                        })
                    } else {
                        this.setState({
                            group: data,
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

    fetchClients = () => {
        getClientsApiCall().then(res => res.json())
            .then(
                (data) => {
                    this.setState({
                        clients: data
                    })
                })
    }

    handleChange = (event) => {
        const {name, value} = event.target;
        const group = {...this.state.group}
        group[name] = value

        const errorMessage = this.validateField(name, value);
        const errors = {...this.state.errors}
        errors[name] = errorMessage

        this.setState({
            group: group,
            errors: errors
        })
    }

    validateField = (fieldName, fieldValue) => {
        let errorMessage = '';
        if (fieldName === 'GroupName') {

            if (!checkRequired(fieldValue)) {
                errorMessage = "Pole jest wymagane";
            } else if (!checkTextLengthRange(fieldValue, 2, 60)) {
                errorMessage = "Pole powinno zawierać od 2 do 60 znaków";
            }
        }

        /*if (fieldName === 'CreationDate') {
            if (!checkRequired(fieldValue)) {
                errorMessage = "Pole jest wymagane";
            } else if (!checkDate(fieldValue)) {
                errorMessage = "Zły format";
            } else if (!checkDateFuture(fieldValue)) {
                errorMessage = "Data nie może być późniejsza niż dzisiejsza"
            }
        }*/

        if (fieldName === 'Description') {
            if (fieldValue.length > 0) {
                if (!checkTextLengthRange(fieldValue, 2, 200)) {
                    errorMessage = "Pole powinno zawierać od 2 do 200 znaków";
                }
            }
        }

        if (fieldName === 'GroupOwner') {
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
                group = this.state.group,
                currentFormMode = this.state.formMode
            let
                promise,
                response;
            if (currentFormMode === formMode.NEW) {
                promise = addGroupApiCall(group)

            } else if (currentFormMode === formMode.EDIT) {
                console.log(group)
                const groupId = this.state.groupId
                promise = updateGroupApiCall(groupId, group)
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
        const group = this.state.groupId;
        const errors = this.state.errors;
        for (const fieldName in group) {
            const fieldValue = group[fieldName];
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
            const notice = currentFormMode === formMode.NEW ? 'Pomyślnie stworzono nową grupę' : 'Pomyślnie zakutalizowano grupę'
            return (
                <Redirect to={{
                    pathname: "/groups/",
                    state: {
                        notice: notice
                    }
                }}/>
            )
        }
        //console.log(this.state.formMode);
        const errorsSummary = this.hasErrors() ? 'Formularz zawiera błędy' : ''
        const fetchError = this.state.error ? `Błąd: ${this.state.error.message}` : ''
        const pageTitle = this.state.formMode === formMode.NEW ? 'Stworzenie Nowej Grupy' : 'Edytowanie Grupy'
        const globalErrorMessage = errorsSummary || fetchError || this.state.message
        return (
            <main>
                <h2>{pageTitle}</h2>
                <form className="form" onSubmit={this.handleSubmit}>
                    <FormInput
                        type="text"
                        label="Nazwa Grupy"
                        required
                        error={this.state.errors.GroupName}
                        name="GroupName"
                        placeholder="2-60 znaków"
                        onChange={this.handleChange}
                        class="symbol-required"
                        value={this.state.group.GroupName}
                    />

                    <FormInput
                        type="text"
                        label="Opis Grupy"
                        required
                        error={this.state.errors.Description}
                        name="Description"
                        placeholder="2-200 znaków"
                        onChange={this.handleChange}
                        class="symbol-required"
                        value={this.state.group.Description}
                    />

                    <label htmlFor="GroupOwner">Właściciel grupy: <abbr title="required" aria-label="required"
                                                                               className="symbol-required"> *</abbr></label>
                    <select name="GroupOwner" id="GroupOwner"
                            value={this.state.group.GroupOwner}
                            onChange={this.handleChange} required>
                        <option value="">--Wbierz Klienta Do Zarządzania Grupą--</option>
                        {this.state.clients.map(c =>
                            (<option key={c.IdClient}
                                     value={c.IdClient}>{c.FirstName + ' ' + c.LastName}</option>)
                        )}
                    </select>
                    <span id="errorGroupOwner" className="errors-text"></span>

                    <FormButtons
                        formMode={this.state.formMode}
                        error={globalErrorMessage}
                        buttonLabel="Grupe"
                        cancelPath="/groups"
                    />
                </form>
            </main>
        )
    }
}

export default GroupForm;