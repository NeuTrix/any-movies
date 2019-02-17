// container to gather movie logic
import axios from 'axios';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
// import shortid from 'shortid';
import { omdb_url } from '../../helpers/api.helper';
import MoviePage from './MoviePage'

import {
	// addFavourite,
	// getFavourites,
	isFavourited,
} from '../favourites';

const propTypes = {
	comments: PropTypes.instanceOf(Array).isRequired, // commentsfor current movie
	currMovie: PropTypes.instanceOf(Object).isRequired, // movie under review
	currUser: PropTypes.instanceOf(Object).isRequired, // current session user
	isFormDisplayed: PropTypes.bool.isRequired, // status of comments form
	isMovieRegistered: PropTypes.bool.isRequired, // movie registered in api db status
};

class MovieContainer extends Component {

	constructor(props) {
		super(props);
		// set intial state for the application
		this.state = {
		};
	}

	// immutably set state with currUser props, movie data, and comments
	componentDidMount() {
	}

	// update the component if new props recieved
	componentDidUpdate(prevProps, prevState) {
	}

	render() {
		// deconstruct state objects
		const {
			comments,
			currMovie,
			currUser,
			isFormDisplayed,
			isMovieRegistered,
		} = this.props;

		return (
			<MoviePage
        comments={comments}
        currMovie={currMovie}
        currUser={currUser}
        isMovieRegistered={isMovieRegistered}
        isFormDisplayed={isFormDisplayed}
      />
		);
	}
}

MovieContainer.propTypes = propTypes;

const mapStateToProps = state => ({
	comments: state.comments.comments,
	currMovie: state.movies.currMovie,
	currUser: state.users.currUser,
	isFormDisplayed: state.comments.isFormDisplayed,
	isMovieRegistered: state.movies.isMovieRegistered,
});

export default connect(mapStateToProps)(MovieContainer);
