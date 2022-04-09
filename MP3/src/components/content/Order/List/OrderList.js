import React from "react";
import {Link} from "react-router-dom";
import Moment from "react-moment";
import {getOrdersApiCall} from "../../../../apiCalls/orderAPI/orderApiCalls";
import OrderListTable from "./OrderListTable";

class OrderList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            orders: []
        }
    }

    componentDidMount() {
        this.fetchOrdersList();
    }


    fetchOrdersList = () => {
        getOrdersApiCall().then(res => res.json()).then(
            (data) => {
                this.setState({
                    isLoaded: true,
                    orders: data
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
        const {error, isLoaded, orders} = this.state
        let content;

        if (error) {
            content = <p> Błąd: {error.message}</p>
        } else if (!isLoaded) {
            content = <p> Ladowanie listy danych zamówień ...</p>
        } else if (orders.size == 0) {
            content = <p className="errors-text">Brak rekordów do wyświetlenia</p>
        } else {
            content = <OrderListTable ordersList={orders}/>
        }

        return (
            <main>
                <h2>Lista Zamówień</h2>
                {content}
                <p><Link to="/orders/add" className="button-add">Dodaj Nowe Zamówienie</Link></p>
            </main>
        );
    }


}

export default OrderList;