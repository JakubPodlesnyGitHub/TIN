import React from "react";
import MovieListTableRow from "./MovieListTableRow";

function MovieListTable(props) {
    const movies = props.moviesList;
    return (
        <table className="table-list">
            <thead>
            <tr>
                <th>Tytuł</th>
                <th>Gatunek Filmowy</th>
                <th>Reżyser</th>
                <th>Akcje</th>
            </tr>
            </thead>
            <tbody>
            {movies.map(movie =>
                <MovieListTableRow movieData={movie} key={movie.IdMovie}/>
            )}
            </tbody>
        </table>
    )
}

export default MovieListTable;