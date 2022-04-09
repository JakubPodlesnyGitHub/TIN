import React from "react";
import {Link} from "react-router-dom";
import {getStoresApiCall} from "../../../../apiCalls/storeAPI/storeApiCalls";
import StoreListTable from "./StoreListTable";

class StoreList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            stores: []
        }
    }

    componentDidMount() {
        this.fetchStoresList();
    }

    fetchStoresList = () => {
        getStoresApiCall().then(res => res.json()).then(
            (data) => {
                this.setState({
                    isLoaded: true,
                    stores: data
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
        const {error, isLoaded, stores} = this.state
        let content;

        if (error) {
            content = <p> Błąd: {error.message}</p>
        } else if (!isLoaded) {
            content = <p> Ladowanie listy danych zakupów w zamówieniach ...</p>
        } else if (stores.size == 0) {
            content = <p className="errors-text">Brak rekordów do wyświetlenia</p>
        } else {
            content = <StoreListTable storesList={stores}/>
        }
        return (
            <main>
                <h2>Lista Zawartości Zamówień</h2>
                {content}
                <p><Link to="/store/add" className="button-add">Dodaj Nowy Produkt Do Zamówienia</Link></p>
            </main>
        );
    }
}

export default StoreList;