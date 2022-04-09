import React from "react";
import {Link} from "react-router-dom";

function StoreDetailsData(props) {
    const store = props.storeData;
    const editString = "/store/edit/" + store.IdStore;
    return (
        <React.Fragment>
            <h2>Szegóły Dotyczące Filmu</h2>
            <form className="form">
                <label htmlFor="Title">Tytuł: <span className="symbol-required">*</span></label>
                <input type="text" name="Title" id="Title" placeholder="np. Matrix" value={store.Movies.Title} required
                       disabled/>
                <span id="errorTitle" className="errors-text"></span>

                <label htmlFor="MovieType">Gatunek Filmu: <span className="symbol-required">*</span></label>
                <input type="text" name="MovieType" id="MovieType" placeholder="np. Fanatsy"
                       value={store.Movies.MovieType} required disabled/>
                <span id="errorMovieType" className="errors-text"></span>

                <label htmlFor="Director">Reżyser: <span className="symbol-required">*</span></label>
                <input type="text" name="Director" id="Director" placeholder="np. Ridley Scott"
                       value={store.Movies.Director} required disabled/>
                <span id="errorDirector" className="errors-text"></span>

                <label htmlFor="Rate">Ocena: <span className="symbol-required">*</span></label>
                <input type="number" name="Rate" id="Rate" placeholder="np. 5"
                       value={store.Movies.Rate} required disabled/>
                <span id="errorRate" className="errors-text"></span>

                <label htmlFor="ReleaseDate">Data Premiery: <span className="symbol-required">*</span></label>
                <input type="date" name="ReleaseDate" id="ReleaseDate"
                       value={new Date(store.Movies.ReleaseDate).toISOString().split('T')[0]} required disabled/>
                <span id="errorReleaseDate" className="errors-text"></span>

                <label htmlFor="Oscar">Oskar: </label>
                <input type="text" name="Oscar" id="Oscar" value={(store.Movies.Oscar) ? 'TAK' : 'NIE'} required
                       disabled/>
                <span id="errorOskar" className="errors-text"></span>

                <label htmlFor="Price">Cena: <span className="symbol-required">*</span></label>
                <input type="number" name="Price" id="Price" placeholder="np. 40" value={store.Movies.Price} required
                       disabled/>
                <span id="errorPrice" className="errors-text"></span>

                <label htmlFor="MovieLength">Długość Filmu: </label>
                <input type="number" name="MovieLength" id="MovieLength" placeholder="np. 154"
                       value={store.Movies.MovieLength}/>
                <span id="errorMovieLength" className="errors-text"></span>
            </form>

            <h2>Szczegóły Dotyczące Klienta</h2>
            <form className="form">
                <label htmlFor="name">Imie: <span className="symbol-required">*</span></label>
                <input type="text" name="name" id="name" value={store.Orders.clients.FirstName} disabled/>
                <span id="errorName" className="errors-text"></span>

                <label htmlFor="lastName">Nazwisko: <span className="symbol-required">*</span></label>
                <input type="text" name="lastName" id="lastName" value={store.Orders.clients.LastName} disabled/>
                <span id="errorLastName" className="errors-text"></span>

                <label htmlFor="postCode">Kod Pocztowy: <span className="symbol-required">*</span></label>
                <input type="text" name="postCode" id="postCode" value={store.Orders.clients.PostCode} disabled/>
                <span id="errorPostCode" className="errors-text"></span>

                <label htmlFor="phone">Tel: </label>
                <input type="tel" name="phone" id="phone" value={store.Orders.clients.PhoneNumber} disabled/>
                <span id="errorPhone" className="errors-text"></span>
            </form>

            <h2>Szczegóły Dotyczące Zamówienia</h2>
            <form className="form" >

                <label htmlFor="OrderCode">Kod Zamówienia: <span className="symbol-required">*</span></label>
                <input type="number" name="OrderCode" id="OrderCode" placeholder="np.1111"
                       value={store.Orders.OrderCode}
                       required disabled/>
                <span id="errorOrderCode" className="errors-text"></span>

                <label htmlFor="IdClient">Imie i Nazwisko Klienta: <span
                    className="symbol-required">*</span></label>
                <input type="text" name="IdClient" id="IdClient"
                       value={store.Orders.clients.FirstName + ' ' + store.Orders.clients.LastName} required disabled/>
                <span id="errorIdClient" className="errors-text"></span>

                <label htmlFor="OrderDate">Data Zamówienia: <span className="symbol-required">*</span></label>
                <input type="date" name="OrderDate" id="OrderDate"
                       value={new Date(store.Orders.OrderDate).toISOString().split('T')[0]} required disabled/>
                <span id="errorOrderDate" className="errors-text"></span>

                <label htmlFor="DeliveryCost">Koszt Dostawy: <span className="symbol-required">*</span></label>
                <input type="number" name="DeliveryCost" id="DeliveryCost" placeholder="np. 80"
                       value={store.Orders.DeliveryCost} required disabled/>
                <span id="errorOrderCost" className="errors-text"></span>
            </form>

            <h2>Szczegóły Dotyczące Produktu W Zamówieniu</h2>
            <form className="form" action={editString}>
                <label htmlFor="Cost">Koszt Zamówienia <span className="symbol-required">*</span></label>
                <input type="number" name="Cost" id="Cost" value={store.Cost} required disabled/>
                <span id="errorCost" className="errors-text"></span>

                <label htmlFor="MovieAmount">Ilość<span className="symbol-required">*</span></label>
                <input type="number" name="MovieAmount" id="MovieAmount" value={store.Amount} disabled/>
                <span id="errorAmount" className="errors-text"></span>
                <div className="form-buttons">
                    <input type="submit" value="Edytuj" className="form-button-submit"/>
                    <Link to="/store" className="form-button-back">Powrót</Link>
                </div>
            </form>
        </React.Fragment>
    )
}

export default StoreDetailsData;