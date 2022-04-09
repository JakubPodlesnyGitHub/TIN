const clientsBaseURL = 'http://localhost:3000/api/clients'

export function getClientsApiCall() {
    const promise = fetch(clientsBaseURL);
    return promise;
}

export function getClientByIdApiCall(clientId) {
    const url = `${clientsBaseURL}/${clientId}`;
    const promise = fetch(url);
    return promise;
}

export function addClientApiCall(client){
    const clientString = JSON.stringify(client);
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: clientString
    }
    const promise = fetch(clientsBaseURL,options);
    return promise;
}

export function updateClientApiCall(clientId,client){
    const url = `${clientsBaseURL}/${clientId}`
    const clientString = JSON.stringify(client)
    const options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: clientString
    }
    const promise = fetch(url,options);
    return promise;
}
export function updateClientPasswordApiCall(clientId,client){
    const url = `${clientsBaseURL}/editPassword/${clientId}`
    const clientString = JSON.stringify(client)
    const options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: clientString
    }
    const promise = fetch(url,options);
    return promise;
}

export function deleteClientApiCall(clientId){
    const url = `${clientsBaseURL}/${clientId}`
    const options = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    }
    const promise = fetch(url,options);
    return promise;
}