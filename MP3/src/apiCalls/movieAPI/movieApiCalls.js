const movieBaseURL = 'http://localhost:3000/api/movies'

export function getMoviesApiCall() {
    const promise = fetch(movieBaseURL);
    return promise;
}

export function getMovieByIdApiCall(movieId) {
    const url = `${movieBaseURL}/${movieId}`;
    const promise = fetch(url);
    return promise;
}

export function addMovieApiCall(movie) {
    const movieString = JSON.stringify(movie);
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: movieString
    }
    const promise = fetch(movieBaseURL, options);
    return promise;
}

export function updateMovieApiCall(movieId, movie) {
    const url = `${movieBaseURL}/${movieId}`
    const movieString = JSON.stringify(movie)
    const options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: movieString
    }
    const promise = fetch(url, options);
    return promise;
}

export function deleteMovieApiCall(movieId){
    const url = `${movieBaseURL}/${movieId}`
    const options = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    }
    const promise = fetch(url,options);
    return promise;
}