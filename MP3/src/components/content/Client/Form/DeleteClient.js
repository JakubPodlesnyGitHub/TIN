import React from "react";
import {deleteClientApiCall} from "../../../../apiCalls/clientAPI/clientsApiCalls";
import {Redirect} from "react-router-dom";

class DeleteClient extends React.Component {
    constructor(props) {
        super(props);
        let {clientId} = props.match.params;
        this.state = {
            clientId: clientId,
            redirect: false
        }
    }

    componentDidMount() {
        this.delClient();
    }

    delClient = () => {
        deleteClientApiCall(this.state.clientId)
            .then(() => {
                this.setState({
                    redirect: true
                })
                return this.render()
            })
        }
    render() {
        if(this.state.redirect) {
            return <Redirect to={{pathname: '/clients'}} />;
        }else {
                return (
                    <main>
                        <p>Trwa usuwanie składnika</p>
                    </main>
                )
        }
    }
}

export default DeleteClient;