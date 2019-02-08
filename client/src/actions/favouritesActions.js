import axios from 'axios';

// add a movie to a user's favourites
export function addFavourite({ userId, favType, favId }) {
  const data = {
    user_id: userId,
    favourited_type: favType,
    favourited_id: favId,
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

export function getFavourites(userId) {

  return axios.get(`api/users/${userId}/favourites`)
    .then(resp => {
      console.log(`Favourites for user: ${userId} retrieved`, resp.data)
      return resp.data
    })
    .catch(err => {
      console.log(err)
    })
}

export function removeFavourite() {

}

  // verify faouorited status for user/movie
export function isFavourited({ favId, favType, userId }) {

  return axios.get('api/favourites', {
    params: {
      favourited_id: favId,
      favourited_type: favType,
      user_id: userId,
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
  