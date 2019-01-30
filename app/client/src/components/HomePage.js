// container to gather movie logic
import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import AddCommentableForm from './AddCommentableForm';
import CommentableContainer from './CommentableContainer';
import MovieDisplay from './MovieDisplay';
import MovieSearchBar from './MovieSearchBar';

const propTypes = {
  classes: PropTypes.instanceOf(Object).isRequired,
  movieID: PropTypes.string.isRequired, // for comment search
  movieType: PropTypes.string.isRequired, // for comment search
  movie: PropTypes.instanceOf(Object).isRequired, // OMBD api movie object
  movieTitle: PropTypes.string.isRequired,
  movieRegistered: PropTypes.string.isRequired,  
  showForm: PropTypes.bool.isRequired,
  userName: PropTypes.string.isRequired,
  // ===> functions
  addReview: PropTypes.func.isRequired, // adds a new review instance to api
  getMovieData: PropTypes.func.isRequired, // search for movie
  toggleReviewForm: PropTypes.func.isRequired, // toggles the addReview form in view
}

function HomePage(props) {
  
  const {
    classes,
    movieID,
    movieType,
    movie,
    movieRegistered,
    showForm,
    userName,
    // functions
    addReview,
    getMovieData,
    toggleReviewForm,
  } = props
  
  return (
    <div className={classes.grid}>

      <h1 style={{ background: 'aliceblue', gridArea: 'title'}} > 
        Movie Blog! 
      </h1>
    
      <div className={classes.actions} style={{ gridArea: 'addReview' }}>
        <Button 
          variant="contained" 
          color="primary" 
          onClick={toggleReviewForm}
        >
          Add Review
        </Button>
      </div>

      <div style={{ gridArea: 'search' }}>
        <MovieSearchBar getMovieData={getMovieData} /> 
      </div>

      <div style={{ gridArea: 'form' }}>
        { showForm && 
          <AddCommentableForm userName={userName} addCommentable={addReview} /> 
        } 
      </div>
      
      <div style={{ gridArea: 'movies' }} >
        <MovieDisplay movie={movie} posterUrl={movie.Poster}/>
      </div>
      
      <div style={{ gridArea: 'comments' }} >
        <CommentableContainer 
          commentableID={movieID}
          commentableType={movieType}
          // these may not be neccessary props
          // movieTitle={movie.Title}
          // movieRegistered={movieRegistered}
        />
      </div>
    </div>
  )
}

// move the display logic outside of the containder component
const styles = theme => ({
  grid: {
    display: 'inline-grid',
    gridTemplateAreas: `
      "title title "
      "form form"
      "search addReview"
      "comments comments"
      "movies movies"
    `,
    gridTemplateColumns: '1fr 1fr',
    padding: theme.spacing.unit,
  },

  actions: {
    display: 'grid',
    padding: theme.spacing.unit,
  }
})

HomePage.propTypes = propTypes;

export default withStyles(styles)(HomePage)
