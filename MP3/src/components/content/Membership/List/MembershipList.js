import React from "react";
import {Link} from "react-router-dom";
import MembershipTable from "./MembershipTable";
import {getMembershipApiCall} from "../../../../apiCalls/membershipApi/membershipApiCalls";

class MembershipList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            memberships: []
        }
    }

    componentDidMount() {
        this.fetchMembershipList();
    }

    fetchMembershipList = () => {
        getMembershipApiCall().then(res => res.json()).then(
            (data) => {
                this.setState({
                    isLoaded: true,
                    memberships: data
                });
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
        const {error, isLoaded, memberships} = this.state
        let content;

        if (error) {
            content = <p> Błąd: {error.message}</p>
        } else if (!isLoaded) {
            content = <p> Ladowanie listy danych członków grup ...</p>
        } else if (memberships.size == 0) {
            content = <p className="errors-text">Brak rekordów do wyświetlenia</p>
        } else {
            content = <MembershipTable membershipList={memberships}/>
        }

        return (
            <main>
                <h2>Członkostwo</h2>
                {content}
                <p><Link to="/memberships/add" className="button-add">Dołącz do danej grupy</Link></p>
            </main>
        );
    }
}

export default MembershipList;