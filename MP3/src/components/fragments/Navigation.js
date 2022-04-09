import React from "react";

import {Link, useParams} from 'react-router-dom';

function Navigation() {
    const navLocation = useParams();
    return (
        <nav>
            <ul>
                <li><Link to="/" >Strona Główna</Link></li>
                <li><Link to="/movies">Filmy</Link></li>
                <li><Link to="/store">Zawratość zamówień</Link></li>
                <li><Link to="/clients">Klienci</Link></li>
                <li><Link to="/orders">Zamówienia</Link></li>
                <li><Link to="/groups">Grupy</Link></li>
                <li><Link to="/memberships">Członkostwo</Link></li>
            </ul>
        </nav>
    );
}

export default Navigation;