import axios from 'axios';

export const getSavedMovies = function () {
    return axios.get('/api/movies');
};

export const saveMovie = function (movieData) {
    return axios.post('/api/movies', movieData);
};

export const deleteMovie = function (movieId) {
    return axios.delete(`/api/movies/${movieId}`);
};

//make a search to OMDB Movie api
export const searchOMDBMovies = function (query) {
    // console.log('https://www.omdbapi.com/?apikey=trilogy&t='+query);
    // return axios.get('https://www.omdbapi.com/?apikey=trilogy&t=', { params: { q: query }});
    return axios.get('https://www.omdbapi.com/?apikey=trilogy&s=' + query);
};
