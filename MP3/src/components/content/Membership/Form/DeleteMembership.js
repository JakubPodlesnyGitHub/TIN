import React from "react";
import {Redirect} from "react-router-dom";
import {deleteMembershipApiCall} from "../../../../apiCalls/membershipApi/membershipApiCalls";

class DeleteMembership extends React.Component {
    constructor(props) {
        super(props);
        let {membershipId} = props.match.params;
        this.state = {
            membershipId: membershipId,
            redirect: false
        }
    }

    componentDidMount() {
        this.delMembership();
    }

    delMembership = () => {
        deleteMembershipApiCall(this.state.membershipId)
            .then(() => {
                this.setState({
                    redirect: true
                })
                return this.render()
            })
        }
    render() {
        if(this.state.redirect) {
            return <Redirect to={{pathname: '/memberships'}} />;
        }else {
                return (
                    <main>
                        <p>Trwa usuwanie składnika</p>
                    </main>
                )
        }
    }
}

export default DeleteMembership;