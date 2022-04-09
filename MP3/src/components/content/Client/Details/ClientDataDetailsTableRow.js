import React from "react";

function ClientDataDetailsTableRow(props){
    const clientOrders = props.ordersData;
    return(
        <tr>
            <td data-label="Kod Zamówienia">{clientOrders.OrderCode}</td>
            <td data-label="Data złożenia zamówienia">{new Date(clientOrders.OrderDate).toISOString().split('T')[0]}</td>
            <td data-label="Koszt dostawy">{clientOrders.DeliveryCost}</td>
        </tr>
    )
}

export default ClientDataDetailsTableRow;