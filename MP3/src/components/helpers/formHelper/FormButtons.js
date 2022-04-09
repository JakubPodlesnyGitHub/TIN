import React from "react";
import {Link} from "react-router-dom";
import formMode from "./formHelper";

function FormButtons(props) {
    const submitButtonLabel = props.formMode === formMode.NEW ? 'Dodaj '  + props.buttonLabel : 'Edytuj ' + props.buttonLabel ;
    return (
        <div className="form-buttons">
            <p id="errorSummary" className="errors-text">{props.error}</p>
            <input type="submit" value={submitButtonLabel} className="form-button-submit"/>
            <Link to={props.cancelPath} className="form-button-cancel">Anuluj</Link>
        </div>
    )
}

export default FormButtons;