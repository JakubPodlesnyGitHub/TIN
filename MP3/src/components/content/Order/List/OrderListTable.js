import React from "react";
import OrderListTableRow from "./OrderListTableRow";

function OrderListTable(props) {
    const orders = props.ordersList;
    return (
        <table className="table-list">
            <thead>
            <tr>
                <th>Kod Zamówienia</th>
                <th>Imie Klienta</th>
                <th>Nazwisko Klienta</th>
                <th>Data Zamówienia</th>
                <th>Koszt Dostawy</th>
                <th>Akcje</th>
            </tr>
            </thead>
            <tbody>
            {orders.map(order =>
                <OrderListTableRow orderData={order} key={order.IdOrder}/>
            )}
            </tbody>
        </table>
    )
}

export default OrderListTable;