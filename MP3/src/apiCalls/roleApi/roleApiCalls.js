const rolesBaseURL = 'http://localhost:3000/api/roles'

export function getRolesApiCall() {
    const promise = fetch(rolesBaseURL);
    return promise;
}

export function getRolesByIdApiCall(roleId) {
    const url = `${rolesBaseURL}/${roleId}`;
    const promise = fetch(url);
    return promise;
}

/*
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
}*/