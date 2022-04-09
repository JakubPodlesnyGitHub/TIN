import React from "react";
import MembershipTableRow from "./MembershipTableRow";

function MembershipTable(props) {
    const memberships = props.membershipList;
    return (
        <table className="table-list">
            <thead>
            <tr>
                <th>Nazwa Grupy</th>
                <th>Imie i Nazwisko Klienta</th>
                <th>Data dołączenia do grupy</th>
                <th>Nick Klienta</th>
                <th>Akcje</th>
            </tr>
            </thead>
            <tbody>
            {memberships.map(membership =>
                <MembershipTableRow membershipData={membership} key={membership.IdMemberShip}/>
            )}
            </tbody>
        </table>
    )
}

export default MembershipTable;