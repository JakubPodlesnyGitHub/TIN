const membershipBaseURL = 'http://localhost:3000/api/memberships'

export function getMembershipApiCall() {
    const promise = fetch(membershipBaseURL);
    return promise;
}

export function getMembershipByIdApiCall(membershipId) {
    const url = `${membershipBaseURL}/${membershipId}`;
    const promise = fetch(url);
    return promise;
}


export function addMembershipApiCall(membership){
    const memberShipString = JSON.stringify(membership);
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: memberShipString
    }
    const promise = fetch(membershipBaseURL,options);
    return promise;
}

export function updateMembershipApiCall(membershipId,membership){
    const url = `${membershipBaseURL}/${membershipId}`
    const memberShipString = JSON.stringify(membership)
    const options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: memberShipString
    }
    const promise = fetch(url,options);
    return promise;
}

export function deleteMembershipApiCall(membershipId){
    const url = `${membershipBaseURL}/${membershipId}`
    const options = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    }
    const promise = fetch(url,options);
    return promise;
}