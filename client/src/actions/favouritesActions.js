import axios from 'axios';

// add a movie to a user's favourites
export function addFavourite({ userId, favType, favId }) {
	const data = {
		user_id: userId,
		favourited_type: favType,
		favourited_id: favId,
	};
	// boolean response, validating user/movie/favourited
	axios.post('/api/favourites', data)
		.then((resp) => {
			if (resp.status === 422) {
				alert('Oops! Looks like you may have liked this already');
			}
			return resp;
		})
		.catch((err) => {
			console.log('==>', err);
		});
}

// return an index of all favourites for this user
export function getFavourites(userId) {
	return axios.get(`api/users/${userId}/favourites`)
		.then((resp) => {
			console.log(`Favourites for user: ${userId} retrieved`, resp.data);
			return resp.data;
		})
		.catch((err) => {
			console.log(err);
		});
}

export function removeFavourite(data) {
  return axios.get('api/favourites', {
    params: {
      favourited_id: data.favourited_id,
      favourited_type: data.favourited_type,
      user_id: data.user_id,
    },
  })
  .then( resp => {
    const favId = resp.data.id
    console.log('visual ----', favId)
    return axios.delete(`api/favourites/${favId}`);
  })
  .catch(err => {
    console.log('in #removeFavourites ==>', err)
  })


}

// Returns a Promise to verify favuorited status for user/movie
// data object has the favourite_id and boolean regarding exists?
export function isFavourited(data) {
	return axios.get('api/favourites', {
		params: {
			favourited_id: data.favourited_id,
			favourited_type: data.favourited_type,
			user_id: data.user_id,
		},
	})
		.then((resp) => {
			if (resp.id !== 'null') {
				console.log('isMovieFavourited status is:', resp.data);
				return resp;
			} 
      console.log(`Something's wrong with the data.\n See the logs.`);
      console.log('data: ', data, 'resp.data: ', resp.data);
		})
		.catch((err) => {
			console.log(err);
		});
}
