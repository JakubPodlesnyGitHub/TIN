const storesBaseURL = 'http://localhost:3000/api/stores'

export function getStoresApiCall() {
    const promise = fetch(storesBaseURL);
    return promise;
}

export function getStoreByIdApiCall(storeId) {
    const url = `${storesBaseURL}/${storeId}`;
    const promise = fetch(url);
    return promise;
}

export function addStoreApiCall(store){
    const storeString = JSON.stringify(store);
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: storeString
    }
    const promise = fetch(storesBaseURL,options);
    return promise;
}

export function updateStoreApiCall(storeId,store){
    const url = `${storesBaseURL}/${storeId}`
    const storeString = JSON.stringify(store)
    const options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: storeString
    }
    const promise = fetch(url,options);
    return promise;
}

export function deleteStoreApiCall(storeId){
    const url = `${storesBaseURL}/${storeId}`
    const options = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    }
    const promise = fetch(url,options);
    return promise;
}