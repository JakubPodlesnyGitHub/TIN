import React from "react";
import {Link} from "react-router-dom";
import {getOrderByIdApiCall} from "../../../../apiCalls/orderAPI/orderApiCalls";
import OrderDetailsData from "./OrderDetailsData";

class OrderDetails extends React.Component {

    constructor(props) {
        super(props);
        let {orderId} = this.props.match.params;
        console.log(orderId)
        this.state = {
            orderId: orderId,
            order: null,
            error: null,
            isLoaded: false,
            message: null
        }
    }

    componentDidMount() {
        this.fetchOrderDetails()
    }

    fetchOrderDetails = () => {
        getOrderByIdApiCall(this.state.orderId).then(res => res.json())
            .then(
                (data) => {
                    if (data.message) {
                        this.setState({
                            order: data,
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
                }
            )
    }

    render() {

        const {order, error, isLoaded, message} = this.state;
        let content;

        if (error) {
            content = <p>Błąd: {error.message}</p>
        } else if (!isLoaded) {
            content = <p> Ladowanie danych zamówienia ...</p>
        } else if (message) {
            content = <p>{message}</p>
        } else {
            content = <OrderDetailsData orderData={order}/>
        }

        return (
            <main>
                <h2>Szegóły Dotyczące Zamówienia</h2>
                {content}
                <div className="form-buttons">
                    <Link to="/orders" className="form-button-back">Powrót</Link>
                </div>
            </main>
        );
    }
}

export default OrderDetails