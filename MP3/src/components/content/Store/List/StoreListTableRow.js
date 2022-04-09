import React from "react";
import {Link} from "react-router-dom";

function StoreListTableRow(props){
    const store = props.storeData;
    return (
        <tr>
            <td data-label="Kod Zamówienia">{store.Orders.OrderCode}</td>
            <td data-label="Film">{store.Movies.Title}</td>
            <td data-label="Koszt Zamówienia">{store.Cost}</td>
            <td data-label="Ilość">{store.Amount}</td>
            <td data-label="Akcje">
                <ul className="list-actions">
                    <li><Link to={`/store/details/${store.IdStore}`}
                              className="list-actions-button-details">Szczegóły</Link></li>
                    <li><Link to={`/store/edit/${store.IdStore}`}
                              className="list-actions-button-edit">Edytuj</Link></li>
                    <li><Link to={`/store/delete/${store.IdStore}`}
                              className="list-actions-button-delete">Usuń</Link></li>
                </ul>
            </td>
        </tr>
    )
}

export default StoreListTableRow;