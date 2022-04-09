const groupsBaseURL = 'http://localhost:3000/api/groups'

export function getGroupsApiCall() {
    const promise = fetch(groupsBaseURL);
    return promise;
}

export function getGroupByIdApiCall(groupId) {
    const url = `${groupsBaseURL}/${groupId}`;
    const promise = fetch(url);
    return promise;
}


export function addGroupApiCall(group) {
    const groupString = JSON.stringify(group);
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: groupString
    }
    const promise = fetch(groupsBaseURL, options);
    return promise;
}

export function updateGroupApiCall(groupId, group) {
    const url = `${groupsBaseURL}/${groupId}`
    const groupString = JSON.stringify(group)
    const options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: groupString
    }
    const promise = fetch(url, options);
    return promise;
}

export function deleteGroupApiCall(groupId){
    const url = `${groupsBaseURL}/${groupId}`
    const options = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    }
    const promise = fetch(url,options);
    return promise;
}