import React from "react";
import {Link} from "react-router-dom";
import {getMovieByIdApiCall} from "../../../../apiCalls/movieAPI/movieApiCalls";
import MovieDetailsData from "./MovieDetailsData";

class MovieDetails extends React.Component {

    constructor(props) {
        super(props);
        let {movieId} = this.props.match.params;
        this.state = {
            movieId: movieId,
            movie: null,
            error: null,
            isLoaded: false,
            message: null
        }
    }

    componentDidMount() {
        this.fetchMovieDetails();
    }

    fetchMovieDetails = () => {
        getMovieByIdApiCall(this.state.movieId).then(res => res.json())
            .then(
                (data) => {
                    if (data.message) {
                        this.setState({
                            movie: data,
                            message: data.message
                        })
                    } else {
                        this.setState({
                            movie: data,
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
        const {movie, error, isLoaded, message} = this.state;
        let content;

        if (error) {
            content = <p>Błąd: {error.message}</p>
        } else if (!isLoaded) {
            content = <p> Ladowanie danych filmu ...</p>
        } else if (message) {
            content = <p>{message}</p>
        } else {
            content = <MovieDetailsData movieData={movie}/>
        }

        return (
            <main>
                <h2>Szegóły Dotyczące Filmu</h2>
                {content}
                <div className="form-buttons">
                    <Link to="/movies" className="form-button-back">Powrót</Link>
                </div>
            </main>
        );
    }

}

export default MovieDetails