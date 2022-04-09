import React from 'react'
import {Link} from "react-router-dom";

function MovieListTableRow(props) {
    const movie = props.movieData;
    return (
        <tr>
            <td data-label="Tytuł">{movie.Title}</td>
            <td data-label="Gatunek Filmowy">{movie.MovieType}</td>
            <td data-label="Reżyser">{movie.Director}</td>
            <td data-label="Akcje">
                <ul className="list-actions">
                    <li><Link to={`/movies/details/${movie.IdMovie}`}
                              className="list-actions-button-details">Szczegóły</Link></li>
                    <li><Link to={`/movies/edit/${movie.IdMovie}`}
                              className="list-actions-button-edit">Edytuj</Link></li>
                    <li><Link to={`/movies/delete/${movie.IdMovie}`}
                              className="list-actions-button-delete">Usuń</Link></li>
                </ul>
            </td>
        </tr>
    )
}

export default MovieListTableRow;