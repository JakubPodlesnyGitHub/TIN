import {ordersList, orderDetailsList} from "./orderApiMockData";

const ordersBaseURL = 'http://localhost:3000/api/orders'

export function getOrdersApiCall() {
    const promise = fetch(ordersBaseURL);
    return promise;
}

export function getOrderByIdApiCall(orderId) {
    const url = `${ordersBaseURL}/${orderId}`;
    const promise = fetch(url);
    return promise;
}

export function addOrderApiCall(order) {
    const orderString = JSON.stringify(order);
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: orderString
    }
    const promise = fetch(ordersBaseURL, options);
    return promise;
}

export function updateOrderApiCall(orderId, order) {
    const url = `${ordersBaseURL}/${orderId}`
    const orderString = JSON.stringify(order)
    const options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: orderString
    }
    const promise = fetch(url, options);
    return promise;
}

export function deleteOrderApiCall(orderId){
    const url = `${ordersBaseURL}/${orderId}`
    const options = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    }
    const promise = fetch(url,options);
    return promise;
}