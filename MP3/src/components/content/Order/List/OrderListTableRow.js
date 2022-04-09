import React from "react";
import Moment from "react-moment";
import {Link} from "react-router-dom";

function OrderListTableRow(props) {
    const order = props.orderData;
    return (
        <tr>
            <td data-label="Kod Zamówienia">{order.OrderCode}</td>
            <td data-label="Imie Klienta">{order.clients.FirstName}</td>
            <td data-label="Nazwisko Klienta">{order.clients.LastName}</td>
            <td data-label="Data Zamówienia"><Moment format="YYYY-MM-DD">{order.OrderDate}</Moment></td>
            <td data-label="Koszt Dostawy">{order.DeliveryCost}</td>
            <td data-label="Akcje">
                <ul className="list-actions">
                    <li><Link to={`/orders/details/${order.IdOrder}`}
                              className="list-actions-button-details">Szczegóły</Link></li>
                    <li><Link to={`/orders/edit/${order.IdOrder}`}
                              className="list-actions-button-edit">Edytuj</Link></li>
                    <li><Link to={`/orders/delete/${order.IdOrder}`}
                              className="list-actions-button-delete">Usuń</Link></li>
                </ul>
            </td>
        </tr>
    )
}

export default OrderListTableRow;