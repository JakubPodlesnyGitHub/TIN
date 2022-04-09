import React from "react";
import {Link} from "react-router-dom";
import GroupDetailsData from "./GroupDetailsData";
import {getGroupByIdApiCall} from "../../../../apiCalls/groupApi/groupApiCalls";

class GroupDetails extends React.Component {

    constructor(props) {
        super(props);
        let {groupId} = this.props.match.params;
        this.state = {
            groupId: groupId,
            group: null,
            error: null,
            isLoaded: false,
            message: null
        }
    }

    componentDidMount() {
        this.fetchGroupDetails();
    }

    fetchGroupDetails = () => {
        getGroupByIdApiCall(this.state.groupId).then(res => res.json())
            .then(
                (data) => {
                    if (data.message) {
                        this.setState({
                            group: data,
                            message: data.message
                        })
                    } else {
                        this.setState({
                            group: data,
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
        const {group, error, isLoaded, message} = this.state;
        let content;

        if (error) {
            content = <p>Błąd: {error.message}</p>
        } else if (!isLoaded) {
            content = <p> Ladowanie danych filmu ...</p>
        } else if (message) {
            content = <p>{message}</p>
        } else {
            content = <GroupDetailsData groupData={group}/>
        }

        return (
            <main>
                <h2>Szegóły Grupy</h2>
                {content}
                <div className="form-buttons">
                    <Link to="/groups" className="form-button-back">Powrót</Link>
                </div>
            </main>
        );
    }

}

export default GroupDetails