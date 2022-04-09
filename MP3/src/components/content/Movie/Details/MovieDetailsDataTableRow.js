import React from "react";
import Moment from "react-moment";

function MovieDetailsDataTableRow(props) {
    const store = props.storeData;
    return (
        <tr>
            <td data-label="Imie i Nazwsisko Klienta">{store.Orders.clients.FirstName + ' ' + store.Orders.clients.LastName}</td>
            <td data-label="Kod Zamówienia">{store.Orders.OrderCode}</td>
            <td data-label="Data Złożenia Zamówienia"><Moment format="YYYY-MM-DD">{store.Orders.OrderDate}</Moment></td>
            <td data-label="Ilość">{store.Amount}</td>
            <td data-label="Koszt zamówienia">{store.Orders.DeliveryCost}</td>
        </tr>
    )
}

export default MovieDetailsDataTableRow;