import React from "react";

function GroupDetailsDataTableRow(props) {
    const memberShip = props.memberShipData;
    return (
        <tr>
            <td data-label="Imie i Nazwsisko Klienta">{memberShip.Clients.FirstName + ' ' + memberShip.Clients.LastName}</td>
            <td data-label="Nick Kilenta">{memberShip.ClientNick}</td>
            <td data-label="Data Dołączenia">{memberShip.JoinDate}</td>
        </tr>
    )
}

export default GroupDetailsDataTableRow;