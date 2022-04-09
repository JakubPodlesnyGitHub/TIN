import React from "react";

function OrderDetailsDataTableRow(props){
    const store = props.orderData;

    return (
        <tr>
            <td data-label="Tytuł Flimu">{store.Movies.Title}</td>
            <td data-label="Gatunek Filmu">{store.Movies.MovieType}</td>
            <td data-label="Reżyser">{store.Movies.Director}</td>
            <td data-label="IdStore">{store.IdStore}</td>
            <td data-label="Ilość">{store.Amount}</td>
            <td data-label="Koszt Zmamówienia">{store.Cost}</td>
        </tr>
    )
}

export default OrderDetailsDataTableRow;