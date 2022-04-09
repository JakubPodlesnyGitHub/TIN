import React from "react";
import StoreListTableRow from "./StoreListTableRow";

function StoreListTable(props) {
    const stores = props.storesList;
    return (
        <table className="table-list">
            <thead>
            <tr>
                <th>Kod Zamówienia</th>
                <th>Film</th>
                <th>Koszt Zamówienia</th>
                <th>Ilość</th>
                <th>Akcje</th>
            </tr>
            </thead>
            <tbody>
            {stores.map(store =>
                <StoreListTableRow storeData={store} key={store.IdStore}/>
            )}
            </tbody>
        </table>
    )
}

export default StoreListTable;