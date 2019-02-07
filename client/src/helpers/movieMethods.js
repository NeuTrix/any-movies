import axios from 'axios';

export function isMovieFavourited(data) {
  return axios.get(`api/favourites`, {
    params: {
      user_id: data.user_id,
      favourited_id: data.favourited_id
    }  
  })

    .then(resp => {
      console.log("inside the resp", resp)
      return resp

    })
    .catch(err => {
      console.log(err)
    })

}



