import React from "react";
import {Redirect} from "react-router-dom";
import {deleteMovieApiCall} from "../../../../apiCalls/movieAPI/movieApiCalls";

class DeleteMovie extends React.Component {
    constructor(props) {
        super(props);
        let {movieId} = props.match.params;
        this.state = {
            movieId: movieId,
            redirect: false
        }
    }

    componentDidMount() {
        this.delMovie();
    }

    delMovie = () => {
        deleteMovieApiCall(this.state.movieId)
            .then(() => {
                this.setState({
                    redirect: true
                })
                return this.render()
            })
        }
    render() {
        if(this.state.redirect) {
            return <Redirect to={{pathname: '/movies'}} />;
        }else {
                return (
                    <main>
                        <p>Trwa usuwanie składnika</p>
                    </main>
                )
        }
    }
}

export default DeleteMovie;