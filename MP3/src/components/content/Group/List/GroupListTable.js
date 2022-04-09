import React from "react";
import GroupListTableRow from "./GroupListTableRow";

function GroupListTable(props) {
    const groups = props.groupList;
    return (
        <table className="table-list">
            <thead>
            <tr>
                <th>Nazawa Grupy</th>
                <th>Data Stworzenia Grupy</th>
                <th>Opis Grupy</th>
                <th>Akcje</th>
            </tr>
            </thead>
            <tbody>
            {groups.map(group =>
                <GroupListTableRow groupData={group} key={group.IdGroup}/>
            )}
            </tbody>
        </table>
    )
}

export default GroupListTable;