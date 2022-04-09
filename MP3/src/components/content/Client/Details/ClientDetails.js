import React from "react";
import {Link} from "react-router-dom";
import {getClientByIdApiCall} from "../../../../apiCalls/clientAPI/clientsApiCalls";
import ClientDetailsData from "./ClientDetailsData";

class ClientDetails extends React.Component {

    constructor(props) {
        super(props);
        let {clientId} = this.props.match.params;
        this.state = {
            clientId: clientId,
            myClient: null,
            error: null,
            isLoaded: false,
            message: null
        }
    }

    componentDidMount() {
        this.fetchClientDetails();
    }

    fetchClientDetails = () => {
        getClientByIdApiCall(this.state.clientId).then(res => res.json())
            .then(
                (data) => {
                    if (data.message) {
                        this.setState({
                            myClient: data,
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

    render() {
        const {myClient, error, isLoaded, message} = this.state;
        let content;

        if (error) {
            content = <p>Błąd: {error.message}</p>
        } else if (!isLoaded) {
            content = <p> Ladowanie danych klienta ...</p>
        } else if (message) {
            content = <p>{message}</p>
        } else {
            content = <ClientDetailsData clientData={myClient}/>
        }

        return (
            <main>
                <h2>Szegóły Dotyczące Klienta</h2>
                {content}
                <div className="form-buttons">
                    <p><Link to="/clients" className="form-button-back">Powrót</Link></p>
                </div>
            </main>
        )
    }
}

export default ClientDetails