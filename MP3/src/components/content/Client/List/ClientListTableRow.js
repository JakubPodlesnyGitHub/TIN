import React from "react";
import {Link} from "react-router-dom";

function ClientListTableRow(props) {
    const myClient = props.cData;
    return(
        <tr>
            <td data-label="Imie">{myClient.FirstName}</td>
            <td data-label="Nazwisko">{myClient.LastName}</td>
            <td data-label="Kod Pocztowy">{myClient.PostCode}</td>
            <td data-label="Telefon">{myClient.PhoneNumber}</td>
            <td data-label="Akcje">
                <ul className="list-actions">
                    <li><Link to={`/clients/details/${myClient.IdClient}`}
                              className="list-actions-button-details">Szczegóły</Link></li>
                    <li><Link to={`/clients/edit/${myClient.IdClient}`}
                              className="list-actions-button-edit">Edytuj</Link></li>
                    <li><Link to={`/clients/delete/${myClient.IdClient}`}
                              className="list-actions-button-delete">Usuń</Link></li>
                </ul>
            </td>
        </tr>
    )
}

export default ClientListTableRow;