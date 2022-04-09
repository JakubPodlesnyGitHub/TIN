import React from 'react'
import {Link} from "react-router-dom";

function MembershipTableRow(props) {
    const membership = props.membershipData;
    return (
        <tr>
            <td data-label="Nazwa Grupy">{membership.Groups.GroupName}</td>
            <td data-label="Imie i Nazwisko Klienta">{membership.Clients.FirstName + ' ' + membership.Clients.LastName}</td>
            <td data-label="Data dołączenia do grupy">{new Date(membership.JoinDate).toISOString().split('T')[0]}</td>
            <td data-label="Nick Klienta">{membership.ClientNick}</td>
            <td data-label="Akcje">
                <ul className="list-actions">
                    <li><Link to={`/memberships/details/${membership.IdMemberShip}`}
                              className="list-actions-button-details">Szczegóły</Link></li>
                    <li><Link to={`/memberships/edit/${membership.IdMemberShip}`}
                              className="list-actions-button-edit">Edytuj</Link></li>
                    <li><Link to={`/memberships/delete/${membership.IdMemberShip}`}
                              className="list-actions-button-delete">Usuń</Link></li>
                </ul>
            </td>
        </tr>
    )
}

export default MembershipTableRow;