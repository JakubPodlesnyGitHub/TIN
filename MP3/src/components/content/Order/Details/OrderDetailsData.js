import React from "react";
import OrderDetailsDataTableRow from "./OrderDetailsDataTableRow";

function OrderDetailsData(props) {
    const order = props.orderData;
    const orderString = "/orders/edit/" + order.IdOrder;
    return (
        <React.Fragment>
            <form action={orderString} className="form">

                <label htmlFor="OrderCode">Kod Zamówienia: <span className="symbol-required">*</span></label>
                <input type="number" name="OrderCode" id="OrderCode" placeholder="np.1111" value={order.OrderCode}
                       required disabled/>
                <span id="errorOrderCode" className="errors-text"></span>

                <label htmlFor="IdClient">Imie i Nazwisko Klienta: <span
                    className="symbol-required">*</span></label>
                <input type="text" name="IdClient" id="IdClient" placeholder="np.1111"
                       value={order.clients.FirstName + ' ' + order.clients.LastName}
                       required disabled/>
                <span id="errorIdClient" className="errors-text"></span>

                <label htmlFor="OrderDate">Data Zamówienia: <span className="symbol-required">*</span></label>
                <input type="date" name="OrderDate" id="OrderDate"
                       value={new Date(order.OrderDate).toISOString().split('T')[0]} required disabled/>
                <span id="errorOrderDate" className="errors-text"></span>

                <label htmlFor="DeliveryCost">Koszt Dostawy: <span className="symbol-required">*</span></label>
                <input type="number" name="DeliveryCost" id="DeliveryCost" placeholder="np. 80"
                       value={order.DeliveryCost} required disabled/>
                <span id="errorOrderCost" className="errors-text"></span>

                <div className="form-buttons">
                    <input type="submit" value="Edytuj" className="form-button-submit"/>
                </div>
            </form>
            <h2>Szczegóły Dotyczących Danych Danego Zamówienia</h2>
            <table className="table-list">
                <thead>
                <tr>
                    <th>Tytuł Flimu</th>
                    <th>Gatunek Filmu</th>
                    <th>Reżyser</th>
                    <th>IdStore</th>
                    <th>Ilość</th>
                    <th>Koszt Zmamówienia</th>
                </tr>
                </thead>
                <tbody>
                {order.Stores.map(store =>
                    <OrderDetailsDataTableRow orderData={store} key={store.IdStore}/>
                )}
                </tbody>
            </table>
        </React.Fragment>
    )
}

export default OrderDetailsData;