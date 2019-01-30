// container to gather movie logic
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
// import shortid from 'shortid';
import { url_movie_data} from '../helpers/api.helper';
import HomePage from './HomePage';

const propTypes = { 
  bugger: PropTypes.bool.isRequired, // test to see if can stimlate preState
}

class HomeContainer extends Component {
  constructor(props) {
    super(props)

    this.state = {
    //  change this movieID-  so not to confuse with commentId
    // get rid of this;;;
      movieID: 'tt0078748', // default to 'Alien'- an awesome movie
      movieType: 'Movie',
      movie: {
        imdbID: 'tt0078748',
        Title: 'Alien',
      }, // default setting. OMDB object will override
      movieRegistered: false,
      showForm: false,
      userID: 1, // must use an exisiting user_id
      userName: "DanTastic333", // defaul userName (not matching in db)
    }

    this.addReview = this.addReview.bind(this);
    this.getMovieData = this.getMovieData.bind(this);
    this.validateMovieRegistration = this.validateMovieRegistration.bind(this);
    this.registerMovie = this.registerMovie.bind(this);
    this.toggleReviewForm = this.toggleReviewForm.bind(this);
  }
  
  // set initial rednering of the page to default
  componentDidMount() {
    this.getMovieData(this.state.movie.Title);
  }

  // adds a new review for the currently displayed Movie
  //  this function is trying to do too many thigs.  
  // Movie save should be an option that pops up/* */
  addReview(data) {
    const { movieID, movieType, userID, movieRegistered } = this.state;

    // veerify registration
    if (!movieRegistered) {
      this.registerMovie();
    }
    // update the data object with required fields
    data.commentable_id = movieID;
    data.commentable_type = movieType;
    data.user_id = userID;

    return axios.post(`/api/movies/${movieID}/comments`, data)
      .then(resp => {
        alert(`Your comment was added! \n comment_id: ${resp.data.id}`)
        this.setState({ showForm: false });
        return resp.data
      })
      .catch(err => { 
        alert (`There was a problem adding your comment. \n ${err}`)
        console.log('ERROR=>',err); 
      })
  }

  // retrieve movie data from OMDB Api
  getMovieData(searchTerm) {

     return axios.get(`${url_movie_data}&t=${searchTerm}`)
      .then(resp => {
        const data = resp.data

        if (data.Error) {
          alert(`Error: ${data.Error} for:\n => ${searchTerm} <= \nTry again`)
        } 
        // verify whether movie is in my api
        this.validateMovieRegistration()
        // update the state movie object (with OMDB movie)
        this.setState({ movie: data, movieID: data.imdbID })
      })
      .catch(err => { 
        console.log(err) 
      })
  }
  // adds a new movie to the internal app database
  registerMovie() {
    const { movie, movieRegistered } = this.state;
    if (!movieRegistered) {

      // create the data object
      let data = { title: movie.Title, imdb_id: movie.imdbID, };

      // make the post call
      axios.post(`/api/movies`, data)
      .then(resp => {
        resp.status === 201
          ? alert(`Added ${data.title} to db with id: ${data.imdb_id}`)
          : alert(`Oops! There was a problem. See the logs for more info`)
          // console.log(resp.data)
          return  resp.data
      })
      .catch(err => {
        console.log(err)
      })
    }
  }

  // allows the addReview form to toggle on and off
  toggleReviewForm() {
    this.setState({ showForm: !this.state.showForm });
  }

  // checks whether movie is currently in the app api database
   validateMovieRegistration() {

     const {
       movieID
     } = this.state;

     axios.get(`/api/movies/${movieID}`)
       .then((resp) => {
         this.setState({
           movieRegistered: true
         })
       })
       .catch(err => {
         this.setState({
           movieRegistered: false
         })
       })
   }

  render() {
    
    return (
      <HomePage 
        // movieID={this.state.movieID}
        movieType={this.state.movieType}
        movie={this.state.movie}
        // movieTitle={this.state.movie.Title}
        // movieRegistered={this.state.movieRegistered}
        showForm={this.state.showForm}
        userName={this.state.userName}
        // functions
        addReview={this.addReview}
        getMovieData={this.getMovieData}
        toggleReviewForm={this.toggleReviewForm}
      />
    )
  }
}

HomeContainer.propTypes = propTypes;

export default HomeContainer
