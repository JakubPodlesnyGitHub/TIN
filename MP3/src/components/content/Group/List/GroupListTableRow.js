import React from 'react'
import {Link} from "react-router-dom";

function GroupListTableRow(props) {
    const group = props.groupData;
    return (
        <tr>
            <td data-label="Nazawa Grupy">{group.GroupName}</td>
            <td data-label="Data Stworzenia Grupy">{new Date(group.CreationDate).toISOString().split('T')[0]}</td>
            <td data-label="Opis Grupy">{group.Description}</td>
            <td data-label="Akcje">
                <ul className="list-actions">
                    <li><Link to={`/groups/details/${group.IdGroup}`}
                              className="list-actions-button-details">Szczegóły</Link></li>
                    <li><Link to={`/groups/edit/${group.IdGroup}`}
                              className="list-actions-button-edit">Edytuj</Link></li>
                    <li><Link to={`/groups/delete/${group.IdGroup}`}
                              className="list-actions-button-delete">Usuń</Link></li>
                </ul>
            </td>
        </tr>
    )
}

export default GroupListTableRow;