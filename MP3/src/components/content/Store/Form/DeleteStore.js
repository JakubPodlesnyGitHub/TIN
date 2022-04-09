import React from "react";
import {Redirect} from "react-router-dom";
import {deleteStoreApiCall} from "../../../../apiCalls/storeAPI/storeApiCalls";

class DeleteStore extends React.Component {
    constructor(props) {
        super(props);
        let {storeId} = props.match.params;
        this.state = {
            storeId: storeId,
            redirect: false
        }
    }

    componentDidMount() {
        this.delClient();
    }

    delClient = () => {
        deleteStoreApiCall(this.state.storeId)
            .then(() => {
                this.setState({
                    redirect: true
                })
                return this.render()
            })
        }
    render() {
        if(this.state.redirect) {
            return <Redirect to={{pathname: '/store'}} />;
        }else {
                return (
                    <main>
                        <p>Trwa usuwanie składnika</p>
                    </main>
                )
        }
    }
}

export default DeleteStore;