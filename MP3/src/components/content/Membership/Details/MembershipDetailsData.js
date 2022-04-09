import React from "react";
import {Link} from "react-router-dom";

function MembershipDetailsData(props) {
    const memberShip = props.membershipData;
    const membershipString = "/memberships/edit/" + memberShip.IdMemberShip;
    return (
        <React.Fragment>
            <h2>Szczegóły Klienta</h2>
            <form className="form">
                <label htmlFor="FirstName">Imie: <span className="symbol-required">*</span></label>
                <input type="text" name="FirstName" id="FirstName" value={memberShip.Clients.FirstName} disabled/>
                <span id="errorName" className="errors-text"></span>

                <label htmlFor="LastName">Nazwisko: <span className="symbol-required">*</span></label>
                <input type="text" name="LastName" id="LastName" value={memberShip.Clients.LastName} disabled/>
                <span id="errorLastName" className="errors-text"></span>

                <label htmlFor="PostCode">Kod Pocztowy: <span className="symbol-required">*</span></label>
                <input type="text" name="PostCode" id="PostCode" value={memberShip.Clients.PostCode} disabled/>
                <span id="errorPostCode" className="errors-text"></span>

                <label htmlFor="PhoneNumber">Tel: </label>
                <input type="tel" name="PhoneNumber" id="PhoneNumber" value={memberShip.Clients.PhoneNumber} disabled/>
                <span id="errorPhone" className="errors-text"></span>

                <label htmlFor="Login">Login: </label>
                <input type="text" name="Login" id="Login" value={memberShip.Clients.Login} disabled/>
                <span id="errorLogin" className="errors-text"></span>

                <label htmlFor="IdRole">Rola: </label>
                <input type="text" name="IdRole" id="IdRole" value={memberShip.Clients.role.RoleName} disabled/>
                <span id="errorRole" className="errors-text"></span>

            </form>
            <h2>Szczegóły Grupy</h2>
            <form className="form">
                <label htmlFor="GroupName">GroupName: <span className="symbol-required">*</span></label>
                <input type="text" name="GroupName" id="GroupName" placeholder="np. Grupa1"
                       value={memberShip.Groups.GroupName}
                       required disabled/>
                <span id="errorGroupName" className="errors-text"></span>

                <label htmlFor="CreationDate">Data Powstania Grupy: <span className="symbol-required">*</span></label>
                <input type="date" name="CreationDate" id="CreationDate"
                       value={new Date(memberShip.Groups.CreationDate).toISOString().split('T')[0]}
                       required disabled/>
                <span id="errorCreationDate" className="errors-text"></span>

                <label htmlFor="Description">Opis Grupy: <span className="symbol-required">*</span></label>
                <input type="text" name="Description" id="Description" placeholder="np. Tu znajduje się opis 2 grupy"
                       value={memberShip.Groups.Description}
                       required disabled/>
                <span id="errorDescription" className="errors-text"></span>
            </form>
            <h2>Szczegóły Członkostwa</h2>
            <form className="form" action={membershipString}>
                <label htmlFor="ClientNick">ClientNick: <span className="symbol-required">*</span></label>
                <input type="text" name="ClientNick" id="ClientNick" placeholder="2-60 znaków"
                       value={memberShip.ClientNick}
                       required disabled/>
                <span id="errorClientNick" className="errors-text"></span>

                <div className="form-buttons">
                    <input type="submit" value="Edytuj" className="form-button-submit"/>
                    <Link to={membershipString} className="form-button-back">Powrót</Link>
                </div>
            </form>
        </React.Fragment>
    )
}

export default MembershipDetailsData;