// container to gather movie logic
import axios from 'axios';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
// import shortid from 'shortid';
import { omdb_url } from '../../helpers/api.helper';
import MoviePage from './MoviePage';

import {
  // addFavourite, 
  // getFavourites,
  isFavourited,
} from '../favourites';

const propTypes = { 
  currUser: PropTypes.instanceOf(Object).isRequired, 
}

class MovieContainer extends Component {

  constructor(props) {
    super(props)
    // set intial state for the application
    this.state = {
      // comments: [], // all (unfiltered) comments in the current app state
      // currMovie: { imdbID: 'tt0078748', Title: 'Alien' }, // from OMDB api
      // currUser: {}, // mock, recieved from props
      // movieIsRegistered: false, // is movie in our current app db as well
    }

    // this.addComment = this.addComment.bind(this);
    // // this.addFavourite = this.addFavourite.bind(this)
    // this.getComments = this.getComments.bind(this)
    // this.getMovieData = this.getMovieData.bind(this);
    // this.isMovieRegistered = this.isMovieRegistered.bind(this);
    // this.registerMovie = this.registerMovie.bind(this);
  }
  
  // immutably set state with currUser props, movie data, and comments
  componentDidMount() {
    // const {  } = this.state;
    // const { currUser, currMovie } = this.props
    // let data = {
    //   title: currMovie.Title,
    //   imdb_id: currMovie.imdbID,
    // };
    
    // currUser: currUser, 
    //   this.setState({ 
    //   data,
    // });
    // // console.log('Mounted')
    // this.getMovieData(currMovie.Title);
    // this.isMovieRegistered()
    
    // if (this.state.movieIsRegistered) {
    //   // resets comments state of current movie
    //   this.setState((state, props) => {
    //     this.getComments();
    //     return state 
    //   })
    // }
  }

  // update the component if new props recieved
  componentDidUpdate(prevProps, prevState) {
    // const { currMovie, currUser } = this.state;

    // if (prevProps.commentable_id !== this.props.commentable_id ||
    //   prevState.comments.length !== this.state.comments.length) {
    //   let data = {
    //     favourited_id: currMovie.imdbID,
    //     favourited_type: "Movie",
    //     user_id: currUser.id,
    //   }
    //   isFavourited(data);
    //   this.getComments();
    //   this.isMovieRegistered()
    // }
  }

  render() {
    // deconstruct state objects
    const { currUser, currMovie, comments, registered  } = this.props

    return (
      <MoviePage 
        comments={comments}
        currMovie={currMovie}
        currUser={currUser}
        movieIsRegistered={registered}
        // functions
        // rename as 'handlexxx'
        // addComment={this.addComment}
        // getComments={this.getComments}
        // getMovieData={this.getMovieData}
        // handleMovieRegistration={this.registerMovie}
      />
    )
  }
}

MovieContainer.propTypes = propTypes;

const mapStateToProps = (state) => ({
  comments: state.comments,
  currMovie: state.movies.currMovie,
  currUser: state.users.currUser,
  registered: state.movies.movieIsRegistered,
});

export default connect(mapStateToProps)(MovieContainer)
