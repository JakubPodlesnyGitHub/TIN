import React from "react";
import GroupDetailsDataTableRow from "./GroupDetailsDataTableRow";

function GroupDetailsData(props) {
    const group = props.groupData;
    const groupsString = "/groups/edit/" +group.IdGroup;
    return (
        <React.Fragment>
            <form action={groupsString} className="form">
                <label htmlFor="GroupName">GroupName: <span className="symbol-required">*</span></label>
                <input type="text" name="GroupName" id="GroupName" placeholder="np. Grupa1" value={group.GroupName} required disabled/>
                <span id="errorGroupName" className="errors-text"></span>

                <label htmlFor="CreationDate">Data Powstania Grupy: <span className="symbol-required">*</span></label>
                <input type="date" name="CreationDate" id="CreationDate" value={new Date(group.CreationDate).toISOString().split('T')[0]}
                       required disabled/>
                <span id="errorCreationDate" className="errors-text"></span>

                <label htmlFor="Description">Opis Grupy: <span className="symbol-required">*</span></label>
                <input type="text" name="Description" id="Description" placeholder="np. Tu znajduje się opis 2 grupy" value={group.Description}
                       required disabled/>
                <span id="errorDescription" className="errors-text"></span>

                <input type="hidden" name="GroupOwner" value="cos" />

                <div className="form-buttons">
                    <input type="submit" value="Edytuj" className="form-button-submit"/>
                </div>

            </form>
            <h2>Szczegóły Dotyczące Danej Grupy</h2>
            <table className="table-list">
                <thead>
                <tr>
                    <th>Imie i Nazwsisko Klienta</th>
                    <th>Nick Kilenta</th>
                    <th>Data Dołączenia</th>
                </tr>
                </thead>
                <tbody>
                {group.Membership.map(membership =>
                    <GroupDetailsDataTableRow memberShipData={membership} key={membership.IdMemberShip}/>
                )}
                </tbody>
            </table>
        </React.Fragment>
    )
}

export default GroupDetailsData;