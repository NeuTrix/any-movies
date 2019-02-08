import axios from 'axios';

// add a movie to a user's favourites
export function addFavouriteMovie({ currMovie, currUser }) {
  const data = {
    user_id: currUser.id,
    favourited_type: 'Movie',
    favourited_id: currMovie.imdbID,
  }
  // boolean response, validating user/movie/favourited
  axios.post(`/api/favourites`, data)
    .then(resp => {
      if (resp.status === 422) {
        alert('Oops! Looks like you may have liked this already')
      }
      return resp
    })
    .catch(err => {
      console.log('==>', err)
    })
}

export function getFavouriteMovies(currUser) {
  const user_id = currUser.id;

  return axios.get(`api/users/${user_id}/favourites`)
    .then(resp => {
      console.log(`Favourites for user: ${user_id} retrieved`, resp.data)
      return resp.data
    })
    .catch(err => {
      console.log(err)
    })
}
  // verify faouorited status for user/movie
export function isMovieFavourited({ currMovie, currUser }) {

  return axios.get('api/favourites', {
    params: {
      user_id: currUser.id,
      favourited_id: currMovie.imdbID,
    }  
  })
    .then(resp => {
      console.log("isMovieFavourtied stats...", resp)
      return resp
    })
    .catch(err => {
      console.log(err)
    })
}
  