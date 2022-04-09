import React from "react";
import {Redirect} from "react-router-dom";
import formMode from "../../../helpers/formHelper/formHelper";
import {getClientsApiCall} from "../../../../apiCalls/clientAPI/clientsApiCalls";
import {
    addMembershipApiCall,
    getMembershipByIdApiCall,
    updateMembershipApiCall
} from "../../../../apiCalls/membershipApi/membershipApiCalls";
import {getGroupsApiCall} from "../../../../apiCalls/groupApi/groupApiCalls";
import {
    checkRequired, checkTextLengthRange
} from "../../../helpers/validationCommon";
import FormInput from "../../../helpers/formHelper/FormInput";
import FormButtons from "../../../helpers/formHelper/FormButtons";

class MembershipForm extends React.Component {

    constructor(props) {
        super(props);

        const paramsMembershipId = props.match.params.membershipId;
        const currentFormMode = paramsMembershipId ? formMode.EDIT : formMode.NEW;

        this.state = {
            membershipId: paramsMembershipId,
            membership: {
                IdClient: '',
                IdGroup: '',
                JoinDate: '',
                ClientNick: '',
                Clients: {
                    FirstName: '',
                    LastName: '',
                    PostCode: '',
                    PhoneNumber: '',
                    Login: '',
                    Password: '',
                    IdRole: ''
                },
                Groups: {
                    GroupName: '',
                    CreationDate: '',
                    Description: '',
                    GroupOwner: ''
                }
            },
            errors: {
                IdClient: '',
                IdGroup: '',
                JoinDate: '',
                ClientNick: '',
                Clients: {
                    FirstName: '',
                    LastName: '',
                    PostCode: '',
                    PhoneNumber: '',
                    Login: '',
                    Password: '',
                    IdRole: ''
                },
                Groups: {
                    GroupName: '',
                    CreationDate: '',
                    Description: '',
                    GroupOwner: ''
                }
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
            groups: [{
                GroupName: '',
                CreationDate: '',
                Description: '',
                GroupOwner: ''
            }],
            formMode: currentFormMode,
            redirect: false,
            error: null
        }
    }

    componentDidMount = () => {
        const currentFormMode = this.state.formMode;
        if (currentFormMode === formMode.EDIT) {
            this.fetchMembershipDetails()
            this.fetchClients();
            this.fetchGroups();
        }
        if (currentFormMode === formMode.NEW) {
            this.fetchClients();
            this.fetchGroups();
        }
    }

    fetchMembershipDetails = () => {
        getMembershipByIdApiCall(this.state.membershipId)
            .then(res => res.json())
            .then(
                (data) => {
                    if (data.message) {
                        this.setState({
                            message: data.message
                        })
                    } else {
                        this.setState({
                            membership: data,
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
                        clients: data
                    })
                })
    }

    fetchGroups = () => {
        getGroupsApiCall().then(res => res.json())
            .then(
                (data) => {
                    this.setState({
                        groups: data
                    })
                })
    }


    handleChange = (event) => {
        const {name, value} = event.target;
        const membership = {...this.state.membership}
        membership[name] = value

        const errorMessage = this.validateField(name, value);
        const errors = {...this.state.errors}
        errors[name] = errorMessage

        this.setState({
            membership: membership,
            errors: errors
        })
    }

    validateField = (fieldName, fieldValue) => {
        let errorMessage = '';
        if (fieldName === 'IdClient') {
            if (!checkRequired(fieldValue)) {
                errorMessage = "Pole jest wymagane";
            }
        }

        if (fieldName === 'IdGroup') {
            if (!checkRequired(fieldValue)) {
                errorMessage = "Pole jest wymagane";
            }
        }

        if (fieldName === 'ClientNick') {
            if (fieldValue.length > 0) {
                if (!checkTextLengthRange(fieldValue, 2, 60)) {
                    errorMessage = "Pole powinno zawierać od 2 do 60 znaków";
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
                membership = this.state.membership,
                currentFormMode = this.state.formMode
            let
                promise,
                response;
            if (currentFormMode === formMode.NEW) {
                promise = addMembershipApiCall(membership)

            } else if (currentFormMode === formMode.EDIT) {
                console.log(membership)
                const membershipId = this.state.membershipId
                promise = updateMembershipApiCall(membershipId, membership)
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
        const membership = this.state.membership;
        const errors = this.state.errors;
        for (const fieldName in membership) {
            const fieldValue = membership[fieldName];
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
            console.log(currentFormMode)
            const notice = currentFormMode === formMode.NEW ? 'Pomyślnie Dodano Nowe Członkowstwo' : 'Pomyślnie Zaktualizowano Członkostwo'
            return (
                <Redirect to={{
                    pathname: "/memberships/",
                    state: {
                        notice: notice
                    }
                }}/>
            )
        }

        const errorsSummary = this.hasErrors() ? 'Formularz zawiera błędy' : ''
        const fetchError = this.state.error ? `Błąd: ${this.state.error.message}` : ''
        const pageTitle = this.state.formMode === formMode.NEW ? 'Dodanie Członkostwa' : 'Edycja Członkostwa'

        const globalErrorMessage = errorsSummary || fetchError || this.state.message;
        return (
            <main>
                <h2>{pageTitle}</h2>
                <form className="form" onSubmit={this.handleSubmit}>

                    <label htmlFor="IdClient">Imie i Nazwisko Klienta: <abbr title="required" aria-label="required"
                                                                             className="symbol-required"> *</abbr></label>
                    <select name="IdClient" id="IdClient" value={this.state.membership.Clients.IdClient}
                            onChange={this.handleChange} required>
                        <option value="">--Wbierz Klienta--</option>
                        {this.state.clients.map(cli =>
                            (<option key={cli.IdClient}
                                     value={cli.IdClient}>{cli.FirstName + ' ' + cli.LastName}</option>)
                        )}
                    </select>
                    <span id="errorIdClient" className="errors-text"></span>

                    <label htmlFor="IdGroup">Nazwa Grupy: <abbr title="required" aria-label="required"
                                                                className="symbol-required"> *</abbr></label>
                    <select name="IdGroup" id="IdGroup" value={this.state.membership.Groups.IdGroup}
                            onChange={this.handleChange} required>
                        <option value="">--Wbierz Grupe--</option>
                        {this.state.groups.map(gr =>
                            (<option key={gr.IdGroup}
                                     value={gr.IdGroup}>{gr.GroupName}</option>)
                        )}
                    </select>
                    <span id="errorIdGroup" className="errors-text"></span>

                    <FormInput
                        type="text"
                        label="Nick Klienta"
                        required
                        error={this.state.errors.ClientNick}
                        name="ClientNick"
                        placeholder="2-200 znaków"
                        onChange={this.handleChange}
                        class="symbol-required"
                        value={this.state.membership.ClientNick}
                    />

                    <FormButtons
                        formMode={this.state.formMode}
                        error={globalErrorMessage}
                        buttonLabel="Członkostwo"
                        cancelPath="/memberships"
                    />
                </form>
            </main>
        )
    }
}

export default MembershipForm;