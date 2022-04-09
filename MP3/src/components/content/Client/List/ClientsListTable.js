import React from "react";
import ClientListTableRow from "./ClientListTableRow";

function ClientsListTable(props) {
    const clients = props.clientList;
    return (
        <table className="table-list">
            <thead>
            <tr>
                <th>Imie</th>
                <th>Nazwisko</th>
                <th>Kod Pocztowy</th>
                <th>Telefon</th>
                <th>Akcje</th>
            </tr>
            </thead>
            <tbody>
            {clients.map(myClient =>
                <ClientListTableRow cData={myClient} key={myClient.IdClient}/>
            )}
            </tbody>
        </table>
    )
}

export default ClientsListTable;