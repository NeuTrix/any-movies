// container to gather movie logic
import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import CommentableContainer from './CommentableContainer';
import MovieDisplay from './MovieDisplay';
import MovieSearchBar from './MovieSearchBar';

const propTypes = {
  classes: PropTypes.instanceOf(Object).isRequired,
  commentableID: PropTypes.string.isRequired, // for comment search
  commentableType: PropTypes.string.isRequired, // for comment search
  getMovieData: PropTypes.func.isRequired, // search for movie
  movie: PropTypes.instanceOf(Object).isRequired, // OMBD api movie object
}

function HomePage(props) {
  
  const {classes, commentableID, commentableType, getMovieData, movie } = props
  
  return (
    <div className={classes.grid}>

      <h1 style={{ background: 'aliceblue', gridArea: 'title'}} > 
        Movie Blog! 
      </h1>
    
      <div className={classes.actions} style={{ gridArea: 'addReview' }}>
        <Button variant="contained" color="primary" >Add Review</Button>
      </div>

      <div style={{ gridArea: 'search' }}>
        <MovieSearchBar getMovieData={getMovieData} /> 
      </div>
      
      <div style={{ gridArea: 'movies' }} >
        <MovieDisplay movie={movie} posterUrl={movie.Poster}/>
      </div>
      
      <div style={{ gridArea: 'comments' }} >
        <CommentableContainer 
          commentableID={commentableID}
          commentableType={commentableType} 
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
      "comments comments"
      "search addReview"
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
