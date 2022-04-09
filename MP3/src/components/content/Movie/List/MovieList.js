import React from "react";
import {Link} from "react-router-dom";
import {getMoviesApiCall} from "../../../../apiCalls/movieAPI/movieApiCalls";
import MovieListTable from "./MovieListTable";

class MovieList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            movies: []
        }
    }

    componentDidMount() {
        this.fetchMoviesList();
    }

    fetchMoviesList = () => {
        getMoviesApiCall().then(res => res.json()).then(
            (data) => {
                this.setState({
                    isLoaded: true,
                    movies: data
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
        const {error, isLoaded, movies} = this.state
        let content;

        if (error) {
            content = <p> Błąd: {error.message}</p>
        } else if (!isLoaded) {
            content = <p> Ladowanie listy danych filmów ...</p>
        } else if (movies.size == 0) {
            content = <p className="errors-text">Brak rekordów do wyświetlenia</p>
        } else {
            content = <MovieListTable moviesList={movies}/>
        }

        return (
            <main>
                <h2>Lista Filmów</h2>
                {content}
                <p><Link to="/movies/add" className="button-add">Dodaj Nowy Film</Link></p>
            </main>
        );
    }
}

export default MovieList;