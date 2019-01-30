// container to gather movie logic
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
// import shortid from 'shortid';
import { url_movie_data} from '../helpers/api.helper';
import HomePage from './HomePage';

const propTypes = { }

class HomeContainer extends Component {
  constructor(props) {
    super(props)

    this.state = {
      commentableID: 'Movie default',
      commentableType: 'Movie',
      movie: {},
      movieRegistered: false,
      showForm: false,
      userID: 1, // must use an exisiting user_id
      userName: "DanTastic333"
    }

    this.addReview = this.addReview.bind(this);
    this.getMovieData = this.getMovieData.bind(this);
    this.isMovieRegistered = this.isMovieRegistered.bind(this);
    this.isMovieRegistered = this.isMovieRegistered.bind(this);
    this.registerMovie = this.registerMovie.bind(this);
    this.toggleForm = this.toggleForm.bind(this);
  }
  
  // set initial state of the page
  componentDidMount(){
    this.getMovieData('Alien');
  }

  componentDidUpdate(prevState) {
    // verify registration status of current movie
    if (!prevState.movieRegistered) {
      this.isMovieRegistered();
    }
  }

  // adds a new review for the currently displayed Movie
  addReview(data) {
    const { commentableID, commentableType, userID } = this.state;
    // data is a state object, passed from the form
    console.log("===> Review Added", data)
    // !! need to remove redundant data from props.  pass in directly
    // to data object here .meth
    data.commentable_id = commentableID;
    data.commentable_type = commentableType;
    data.user_id = userID;
    
    // determine rails path for commentable
    let pathType = commentableType === 'Movie' ? 'movies' : 'comments'

    return axios.post(`/api/${pathType}/${commentableID}/comments`, data)
      .then(resp => {
        console.log('KKKKK==> addRev data',resp)
        // return resp.data
      })
      .catch(err => { 
        console.log('ERROR=>',err); 
      })
  }

  // search and get movie data from OMDB Api
  getMovieData(searchTerm) {

    return axios.get(`${url_movie_data}&t=${searchTerm}`)
      .then(resp => {
        const data = resp.data

        if (data.Error) {
          alert(`Error: ${data.Error} for:\n => ${searchTerm} <= \nTry again`)
        } 
        this.setState({ movie: data, commentableID: data.imdbID })

      })
      .catch(err => { 
        console.log('===>Error',err) 
      })
  }

  // boolean to determine whetehr the movie is in the current db
  isMovieRegistered() {
    const { commentableID } = this.state

    axios.get(`/api/movies/${commentableID}`)
      .then(resp => {
        if (resp.status === 200) {
          this.setState({movieRegistered: true})
        }
      })
      .catch(err => {
        console.log(err)
      })
  }

  registerMovie(movieId) {

  }
  
  // allows the addReview form to toggle on and off
  toggleForm() {
    this.setState({ showForm: !this.state.showForm });
  }

  render() {
    
    return (
      <HomePage 
      commentableID={this.state.commentableID}
      commentableType={this.state.commentableType}
      movie={this.state.movie}
      showForm={this.state.showForm}
      userName={this.state.userName}
      // functions
      addReview={this.addReview}
      getMovieData={this.getMovieData}
      toggleForm={this.toggleForm}
      />
    )
  }
}

HomeContainer.propTypes = propTypes;

export default HomeContainer
