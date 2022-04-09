import React from "react";
import {Link} from "react-router-dom";
import {getClientsApiCall} from "../../../../apiCalls/clientAPI/clientsApiCalls";
import ClientsListTable from "./ClientsListTable";

class ClientsList extends React.Component {

    constructor(props) {
        super(props);
        let notice = props.location.state && props.location.state.notice ? props.location.state.notice : ''
        this.state = {
            error: null,
            isLoaded: false,
            clients: [],
            notice: notice
        }
    }

    componentDidMount() {
        this.fetchClientsList();
    }

    fetchClientsList = () => {
        getClientsApiCall().then(res => res.json()).then(
            (data) => {
                this.setState({
                    isLoaded: true,
                    clients: data
                });
            },
            (error) => {
                this.setState({
                    isLoaded: true,
                    error
                });
            }
        )
    }
    render() {
        const {error, isLoaded, clients} = this.state
        let content;
        if (error) {
            content = <p>Błąd: {error.message}</p>
        } else if (!isLoaded) {
            content = <p> Ladowanie listy danych klientów ...</p>
        } else if (clients.size == 0) {
            content = <p className="errors-text">Brak rekordów do wyświetlenia</p>
        } else {
            content = <ClientsListTable clientList={clients}/>
        }

        return (
            <main>
                <h2>Lista Klientów</h2>
                {content}
                <p className="success">{this.state.notice}</p>
                <p><Link to="/clients/add" className="button-add">Dodaj Nowego Klienta</Link></p>
            </main>
        );
    }

}

export default ClientsList;