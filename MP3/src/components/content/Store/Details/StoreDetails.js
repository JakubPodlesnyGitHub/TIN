import React from "react";
import {getStoreByIdApiCall} from "../../../../apiCalls/storeAPI/storeApiCalls";
import StoreDetailsData from "./StoreDetailsData";

class StoreDetails extends React.Component {

    constructor(props) {
        super(props);
        let {storeId} = this.props.match.params;
        this.state = {
            storeId: storeId,
            store: null,
            error: null,
            isLoaded: false,
            message: null
        }
    }

    componentDidMount() {
        this.fetchStoreDetails();
    }

    fetchStoreDetails = () => {
        getStoreByIdApiCall(this.state.storeId)
            .then(res => res.json())
            .then(
                (data) => {
                    if (data.message) {
                        this.setState({
                            store: null,
                            message: data.message
                        })
                    } else {
                        this.setState({
                            store: data,
                            message: null,
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

    render() {
        const {store, error, isLoaded, message} = this.state;
        let content;

        if (error) {
            content = <p>Błąd: {error.message}</p>
        } else if (!isLoaded) {
            content = <p> Ladowanie danego produktu w zamówieniu ...</p>
        } else if (message) {
            content = <p>{message}</p>
        } else {
            content = <StoreDetailsData storeData={store}/>
        }

        return (
            <main>
                {content}
            </main>
        );
    }
}

export default StoreDetails