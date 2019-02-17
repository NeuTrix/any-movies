// import axios from 'axios';

// // adds a new review for the currently displayed Movie
// // addComment({data, commentable}) {
// //   const { currMovie } = this.state;

// //   return axios.post(`/api/movies/${currMovie.imdbID}/comments`, data)
// //     .then(resp => {
// //       if (resp.status === 201) {
// //         alert(`Your comment was added! \n comment_id: ${resp.data.id}`)
// //         this.setState({ displayingCommentForm: false });
// //         return resp.data
// //       } else {
// //         alert('Got problems with adding comments, dude! \n Please check the console logs')
// //       }
// //     })
// //     .then(data => {
// //       // reset the comments data
// //       this.getComments()        
// //     })
// //     .catch(err => { 
// //       alert (`There was a problem adding your comment. \n ${err}`)
// //       console.log('ERROR=>',err); 
// //     })
// // }

// // used to populate the comments state object
// // getComments() {
// //   const { currMovie } = this.state;
// //   console.log('getting comments for:', currMovie.Title, currMovie.imdbID)

// //   return axios.get(`/api/movies/${currMovie.imdbID}/comments`)
// //     .then(resp => {
// //       let comments = resp.data;
// //       if (comments) {
// //         this.setState((state) => { 
// //           return { ...state, comments} 
// //         });
// //         return comments
// //       } 
// //       return console.log('No comments for this movie yet')
// //     })
// //     .catch(err => {
// //       console.log('Err: #getComments=>', err);
// //       // reset the comments for an unregistered movie
// //       this.setState((state) => {
// //         let comments = [];
// //         return { ...state, comments }
// //       });
// //     })
// // }

// //  retrieve movie data from OMDB Api
// getMovieData(searchTerm) {
//   this.isMovieRegistered()

//   return axios.get(`${omdb_url}&t=${searchTerm}`)
//     .then(resp => {
//       const data = resp.data
//       if (data.Error) {
//         alert(`Error: ${data.Error} for:\n => ${searchTerm} <= \nTry again`)
//       }
//       return data
//     })
//     .then(data => {
//       // update the state movie object (with OMDB currMovie)
//       this.setState((state) => {
//         let currMovie = data
//         return {
//           ...state,
//           currMovie
//         }
//       })
//       console.log('movie container: resetting movie state')
//       return data
//     })
//     .then(data => {
//       // reset the comments state
//       if (this.state.isMovieRegistered) {
//         this.getComments();
//         console.log('movie container: updating comments');
//       }
//     })
//     .catch(err => {
//       console.log(err)
//     })
// }

// // adds a new movie to the internal app database
// // registerMovie() {
// //   const { currMovie, isMovieRegistered } = this.state;
// //   if (!isMovieRegistered) {

// //     // create the data object
// //     let data = { title: currMovie.Title, imdb_id: currMovie.imdbID, };

// //     // make the post call
// //     axios.post(`/api/movies`, data)
// //     .then(resp => {
// //       resp.status === 201
// //         ? alert(`Congratulations.  \n You'll be the first one to comment on this film! \n Added ${data.title} to db with id: ${data.imdb_id}`)
// //         : alert(`Oops! There was a problem. See the logs for more info`)
// //         // console.log(resp.data)
// //         return  resp.data
// //     })
// //     .catch(err => {
// //       console.log(err)
// //     })
// //   }
// // }

// // checks whether movie is currently in the app api database
// isMovieRegistered() {
//   const {
//     currMovie
//   } = this.state;

//   axios.get(`/api/movies/${currMovie.imdbID}`)
//     .then((resp) => {
//       if (resp.status === 200) {

//         this.setState({
//           isMovieRegistered: true
//         })
//       }
//     })
//     .catch(err => {
//       this.setState({
//         isMovieRegistered: false
//       })
//     })
// }
// // // // adds a new movie to the internal app database
// registerMovie(data) {
//   // console.log('#registerMovie: the data is', data)
//   return axios.post(`/api/movies`, data)
//     .then(resp => {
//       // resp.status === 201
//       return console.log('pppp==>', resp)
//       // return resp.data
//     })
//     .catch(err => {
//       console.log(err)
//     })
// }
// export const addMovie = () => {

// }
