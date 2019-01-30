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
  movie: PropTypes.instanceOf(Object).isRequired, // OMBD api movie object
  showForm: PropTypes.bool.isRequired,
  userName: PropTypes.string.isRequired,
  userID: PropTypes.string.isRequired,
  // ===> functions
  addReview: PropTypes.func.isRequired, // adds a new review instance to api
  getMovieData: PropTypes.func.isRequired, // search for movie
  toggleReviewForm: PropTypes.func.isRequired, // toggles the addReviewForm 
}

function HomePage(props) {
  const { classes, movie, showForm, userName } = props // decon prop variables
  const { addReview, getMovieData, toggleReviewForm } = props // dcon prop fns
  
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
          <AddCommentableForm author={userName} addCommentable={addReview} /> 
        } 
      </div>
      
      <div style={{ gridArea: 'movies' }} >
        <MovieDisplay movie={movie} posterUrl={movie.Poster}/>
      </div>
      
      <div style={{ gridArea: 'comments' }} >
        <CommentableContainer 
          commentableID={movie.imdbID}
          commentableType={"Movie"}
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
