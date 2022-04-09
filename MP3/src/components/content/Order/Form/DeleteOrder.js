import React from "react";
import {Redirect} from "react-router-dom";
import {deleteOrderApiCall} from "../../../../apiCalls/orderAPI/orderApiCalls";

class DeleteOrder extends React.Component {
    constructor(props) {
        super(props);
        let {orderId} = props.match.params;
        this.state = {
            orderId: orderId,
            redirect: false
        }
    }

    componentDidMount() {
        this.delOrder();
    }

    delOrder = () => {
        deleteOrderApiCall(this.state.orderId)
            .then(() => {
                this.setState({
                    redirect: true
                })
                return this.render()
            })
        }
    render() {
        if(this.state.redirect) {
            return <Redirect to={{pathname: '/orders'}} />;
        }else {
                return (
                    <main>
                        <p>Trwa usuwanie składnika</p>
                    </main>
                )
        }
    }
}

export default DeleteOrder;