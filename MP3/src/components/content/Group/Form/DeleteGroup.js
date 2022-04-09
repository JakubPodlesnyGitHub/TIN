import React from "react";
import {Redirect} from "react-router-dom";
import {deleteGroupApiCall} from "../../../../apiCalls/groupApi/groupApiCalls";

class DeleteGroup extends React.Component {
    constructor(props) {
        super(props);
        let {groupId} = props.match.params;
        this.state = {
            groupId: groupId,
            redirect: false
        }
    }

    componentDidMount() {
        this.delGroup();
    }

    delGroup = () => {
        deleteGroupApiCall(this.state.groupId)
            .then(() => {
                this.setState({
                    redirect: true
                })
                return this.render()
            })
        }
    render() {
        if(this.state.redirect) {
            return <Redirect to={{pathname: '/groups'}} />;
        }else {
                return (
                    <main>
                        <p>Trwa usuwanie składnika</p>
                    </main>
                )
        }
    }
}

export default DeleteGroup;