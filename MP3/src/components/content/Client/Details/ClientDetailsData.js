import React from "react";
import ClientDataDetailsTableRow from "./ClientDataDetailsTableRow";
import {Link} from "react-router-dom";

function ClientDetailsData(props) {
    const myClient = props.clientData;
    const clientString = "/clients/edit/" + myClient.IdClient;
    return (
        <React.Fragment>
            <form action={clientString} className="form">
                <label htmlFor="FirstName">Imie: <span className="symbol-required">*</span></label>
                <input type="text" name="FirstName" id="FirstName" value={myClient.FirstName} disabled/>
                <span id="errorName" className="errors-text"></span>

                <label htmlFor="LastName">Nazwisko: <span className="symbol-required">*</span></label>
                <input type="text" name="LastName" id="LastName" value={myClient.LastName} disabled/>
                <span id="errorLastName" className="errors-text"></span>

                <label htmlFor="PostCode">Kod Pocztowy: <span className="symbol-required">*</span></label>
                <input type="text" name="PostCode" id="PostCode" value={myClient.PostCode} disabled/>
                <span id="errorPostCode" className="errors-text"></span>

                <label htmlFor="PhoneNumber">Tel: </label>
                <input type="tel" name="PhoneNumber" id="PhoneNumber" value={myClient.PhoneNumber} disabled/>
                <span id="errorPhone" className="errors-text"></span>

                <label htmlFor="Login">Login: </label>
                <input type="text" name="Login" id="Login" value={myClient.Login} disabled/>
                <span id="errorLogin" className="errors-text"></span>

                <label htmlFor="IdRole">Rola: </label>
                <input type="text" name="IdRole" id="IdRole" value={myClient.role.RoleName} disabled/>
                <span id="errorRole" className="errors-text"></span>

                <div className="form-buttons">
                    <input type="submit" value="Edytuj" className="form-button-submit"/>
                    <Link to={`/clients/editPassword/${myClient.IdClient}`}
                          className="form-button-members">Zmiana Hasła</Link>
                </div>
            </form>
            <h2>Szczegóły Dotyczących Danych Danego Klienta</h2>
            <table className="table-list">
                <thead>
                <tr>
                    <th>Kod Zamówienia</th>
                    <th>Data złożenia zamówienia</th>
                    <th>Koszt dostawy</th>
                </tr>
                </thead>
                <tbody>
                {myClient.orders.map(order =>
                    <ClientDataDetailsTableRow ordersData={order} key={order.IdOrder}/>
                )}
                </tbody>
            </table>
        </React.Fragment>
    )
}

export default ClientDetailsData;