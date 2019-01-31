// container to gather movie logic
import axios from 'axios';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
// import shortid from 'shortid';
import { url_movie_data } from '../../helpers/api.helper';
import MoviePage from './MoviePage';

const propTypes = { 
  curr_user: PropTypes.instanceOf(Object).isRequired, 
}

class MovieContainer extends Component {
  constructor(props) {
    super(props)
    // set intial state for the application
    this.state = {
      commentable_id: 'tt0078748', // derived from app Api commentable object 
      commentable_type: 'Movie', // dervied from app Api commentable object
      comments: [], // comments related to current app state

      curr_movie: { imdbID: 'tt0078748', Title: 'Alien', }, // from OMDB api
      curr_user: '', // mock, recieved from props
      movieRegistered: false, // is movie in our current app db as well
    }

    this.addComment = this.addComment.bind(this);
    this.getComments = this.getComments.bind(this)
    this.getMovieData = this.getMovieData.bind(this);
    this.validateMovieRegistration = this.validateMovieRegistration.bind(this);
    this.registerMovie = this.registerMovie.bind(this);
  }
  
  // immutably set state with curr_user props, movie data, and comments
  componentDidMount() {
    this.setState((state, props) => {
      const { commentable_id, commentable_type, curr_movie} = state;
      this.getMovieData(curr_movie.Title);
      this.getComments(commentable_id, commentable_type);
      let curr_user = props.curr_user
      return { ...state, curr_user }
    })
  }

  // adds a new review for the currently displayed Movie
  //  this function is trying to do too many thigs.  
  // Movie save should be an option that pops up/* */
  addComment(data) {
    const { curr_movie, movieType, userID, movieRegistered } = this.state;

    // veerify registration for movie comments only. (not comments/comments)
    if (!movieRegistered) {
      this.registerMovie();
    }
    // update the data object with required fields
    data.commentable_id = curr_movie.imdbID;
    data.commentable_type = movieType;
    data.user_id = userID;

    return axios.post(`/api/movies/${curr_movie.imdbID}/comments`, data)
      .then(resp => {
        alert(`Your comment was added! \n comment_id: ${resp.data.id}`)
        this.setState({ displayingCommentForm: false });
        return resp.data
      })
      .catch(err => { 
        alert (`There was a problem adding your comment. \n ${err}`)
        console.log('ERROR=>',err); 
      })
  }

  // used to populate the comments state object
  getComments(id, type) {

    // determine rails path for commentable
    let pathType = type === 'Movie' ? 'movies' : 'comments'

    return axios.get(`/api/${pathType}/${id}/comments`)
      .then(resp => {
        let comments = resp.data;
        this.setState((state) => {
          // console.log(comments, state.comments)
          return {...state, comments}
        });
        
        console.log(comments, this.state.comments)
        return comments
      })
      .catch(err => {
        alert(`Err...This Movie may not be registered \n ${err}`)
        console.log('ERROR=>', err);

        // reset the comments for an unregistered movie
        this.setState((state) => {
          let comments = [];
          return { ...state, comments }
        });
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
        // update the state movie object (with OMDB curr_movie)
        this.setState({ curr_movie: data })
      })
      .catch(err => { 
        console.log(err) 
      })
  }

  // adds a new movie to the internal app database
  registerMovie() {
    const { curr_movie, movieRegistered } = this.state;
    if (!movieRegistered) {

      // create the data object
      let data = { title: curr_movie.Title, imdb_id: curr_movie.imdbID, };

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

  // checks whether movie is currently in the app api database
  validateMovieRegistration() {
    const { curr_movie } = this.state;

    axios.get(`/api/movies/${curr_movie.imdbID}`)
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
    // deconstruct state objects
    const { curr_movie, curr_user, comments } = this.state
    // console.log(this.state)
    return (
      <MoviePage 
        // objects
        comments={comments}
        curr_movie={curr_movie}
        curr_user={curr_user}
        // functions
        addComment={this.addComment}
        getComments={this.getComments}
        getMovieData={this.getMovieData}
      />
    )
  }
}

MovieContainer.propTypes = propTypes;

export default MovieContainer
