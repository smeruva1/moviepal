import axios from 'axios';

export const getAllUsers = function () {
    return axios.get('/api/users');
  };
  
  // route to get logged in user's info (needs the token)
  export const getMe = function (token) {
    return axios.get('/api/users/me', { headers: { authorization: `Bearer ${token}` } });
  };
  
  // get a user by their username, not being used in the app just showing how it could work
  export const getUser = function (username) {
    return axios.get(`/api/users/${username}`);
  };
  
  export const createUser = function (userData) {
    return axios.post('/api/users', userData);
  };
  
  export const loginUser = function (userData) {
    return axios.post('/api/users/login', userData);
  };

  export const saveMovie = function (movieData, token) {
    return axios.put('/api/users', movieData, { headers: { authorization: `Bearer ${token}` } });
  };

export const getSavedMovies = function () {
    return axios.get('/api/movies');
};

export const getMovieDetails = function (movieId) {
    return axios.get(`/api/movies/details/${movieId}`);
};

export const saveMovie = function (movieData) {
    return axios.post('/api/movies', movieData);
};

export const deleteMovie = function (movieId) {
    return axios.delete(`/api/movies/${movieId}`);
};

//make a search to OMDB Movie api
export const searchOMDBMovies = async (query) => {
    // console.log('https://www.omdbapi.com/?apikey=trilogy&t='+query);
    // return axios.get('https://www.omdbapi.com/?apikey=trilogy&t=', { params: { q: query }});
    return axios.get('https://www.omdbapi.com/?apikey=trilogy&s=' + query);
      
};
