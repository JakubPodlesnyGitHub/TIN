import React from "react";
import MovieDetailsDataTableRow from "./MovieDetailsDataTableRow";

function MovieDetailsData(props) {
    const movie = props.movieData;
    const movieString = "/movies/edit/" + movie.IdMovie;
    return (
        <React.Fragment>
            <form action={movieString} className="form">
                <label htmlFor="Title">Tytuł: <span className="symbol-required">*</span></label>
                <input type="text" name="Title" id="Title" placeholder="np. Matrix" value={movie.Title} required
                       disabled/>
                <span id="errorTitle" className="errors-text"></span>

                <label htmlFor="MovieType">Gatunek Filmu: <span className="symbol-required">*</span></label>
                <input type="text" name="MovieType" id="MovieType" placeholder="np. Fanatsy" value={movie.MovieType}
                       required disabled/>
                <span id="errorMovieType" className="errors-text"></span>

                <label htmlFor="Director">Reżyser: <span className="symbol-required">*</span></label>
                <input type="text" name="Director" id="Director" placeholder="np. Ridley Scott" value={movie.Director}
                       required disabled/>
                <span id="errorDirector" className="errors-text"></span>

                <label htmlFor="Rate">Ocena: <span className="symbol-required">*</span></label>
                <input type="number" name="Rate" id="Rate" value={movie.Rate} required disabled/>
                <span id="errorRate" className="errors-text"></span>

                <label htmlFor="ReleaseDate">Data Premiery: <span className="symbol-required">*</span></label>
                <input type="date" name="ReleaseDate" id="ReleaseDate" value={new Date(movie.ReleaseDate).toISOString().split('T')[0]} required disabled/>
                <span id="errorReleaseDate" className="errors-text"></span>

                <label htmlFor="Oscar">Oskar: </label>
                <select name="Oscar" id="Oscar" value={movie.Oscar} required disabled>
                    <option value="">--Czy film posiada oscara--</option>
                    <option value="true">TAK</option>
                    <option value="false">NIE</option>
                </select>
                <span id="errorOskar" className="errors-text"></span>

                <label htmlFor="Price">Cena: <span className="symbol-required">*</span></label>
                <input type="number" name="Price" id="Price" placeholder="np. 40" value={movie.Price} required
                       disabled/>
                <span id="errorPrice" className="errors-text"></span>

                <label htmlFor="MovieLength">Długość Filmu: </label>
                <input type="number" name="MovieLength" id="MovieLength" placeholder="np. 154" value={movie.MovieLength}
                       disabled/>
                <span id="errorMovieLength" className="errors-text"></span>

                <div className="form-buttons">
                    <input type="submit" value="Edytuj" className="form-button-submit"/>
                </div>
            </form>
            <h2>Szczegóły Dotyczące Danego Filmu</h2>
            <table className="table-list">
                <thead>
                <tr>
                    <th>Imie i Nazwsisko Klienta</th>
                    <th>Kod Zamówienia</th>
                    <th>Data Złożenia Zamówienia</th>
                    <th>Ilość</th>
                    <th>Koszt zamówienia</th>
                </tr>
                </thead>
                <tbody>
                {movie.Stores.map(store =>
                    <MovieDetailsDataTableRow storeData={store} key={store.IdStore}/>
                )}
                </tbody>
            </table>
        </React.Fragment>
    )
}

export default MovieDetailsData;