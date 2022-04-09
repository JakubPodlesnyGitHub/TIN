import React from "react";
import {Link} from "react-router-dom";
import GroupListTable from "./GroupListTable";
import {getGroupsApiCall} from "../../../../apiCalls/groupApi/groupApiCalls";

class GroupList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            groups: []
        }
    }

    componentDidMount() {
        this.fetchMoviesList();
    }

    fetchMoviesList = () => {
        getGroupsApiCall().then(res => res.json()).then(
            (data) => {
                this.setState({
                    isLoaded: true,
                    groups: data
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
        const {error, isLoaded, groups} = this.state
        let content;

        if (error) {
            content = <p> Błąd: {error.message}</p>
        } else if (!isLoaded) {
            content = <p> Ladowanie listy danych grup ...</p>
        } else if (groups.size == 0) {
            content = <p className="errors-text">Brak rekordów do wyświetlenia</p>
        } else {
            content = <GroupListTable groupList={groups}/>
        }

        return (
            <main>
                <h2>Lista Grup</h2>
                {content}
                <p><Link to="/groups/add" className="button-add">Stwórz Nową Grupę</Link></p>
            </main>
        );
    }
}

export default GroupList;