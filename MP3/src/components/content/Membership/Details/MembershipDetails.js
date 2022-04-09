import React from "react";
import {Link} from "react-router-dom";
import MembershipDetailsData from "./MembershipDetailsData";
import {getMembershipByIdApiCall} from "../../../../apiCalls/membershipApi/membershipApiCalls";

class MembershipDetails extends React.Component {

    constructor(props) {
        super(props);
        let {membershipId} = this.props.match.params;
        this.state = {
            membershipId: membershipId,
            membership: null,
            error: null,
            isLoaded: false,
            message: null
        }
    }

    componentDidMount() {
        this.fetchMembershipsDetails();
    }

    fetchMembershipsDetails = () => {
        getMembershipByIdApiCall(this.state.membershipId).then(res => res.json())
            .then(
                (data) => {
                    if (data.message) {
                        this.setState({
                            membership: data,
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
                }
            )
    }

    render() {
        const {membership, error, isLoaded, message} = this.state;
        let content;

        if (error) {
            content = <p>Błąd: {error.message}</p>
        } else if (!isLoaded) {
            content = <p> Ladowanie danych członkostwa ...</p>
        } else if (message) {
            content = <p>{message}</p>
        } else {
            content = <MembershipDetailsData membershipData={membership}/>
        }

        return (
            <main>
                {content}
            </main>
        );
    }

}

export default MembershipDetails