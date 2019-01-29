// container to gather movie logic
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import axios from 'axios';
import { url_movie_data} from '../helpers/api.helper';
import CommentableContainer from './CommentableContainer';
import MovieDisplay from './MovieDisplay';
import MovieSearchBar from './MovieSearchBar';

const propTypes = {
  classes: PropTypes.instanceOf(Object).isRequired,
  commentableID: PropTypes.string.isRequired,
  commentableType: PropTypes.string.isRequired,
  getMovieData: PropTypes.func.isRequired,
  movie: PropTypes.instanceOf(Object).isRequired,
}

function HomePage(props) {
  
  const {classes, commentableID, commentableType, getMovieData, movie } = props
  
  return (
    <div className={classes.grid}>

      <h1 style = {{ background: 'aliceblue', gridArea: 'title'}} > 
        Movie Blog! 
      </h1>

      <MovieSearchBar 
        style={{ gridArea: 'search' }}
        getMovieData={getMovieData} 
      />
      
      < div style={{ gridArea: 'movies' }} >
        <MovieDisplay movie={movie} posterUrl={movie.Poster}/>
      </div>
      
      < div style={{ gridArea: 'comments' }} >
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
      "title"
      "comments"
      "search"
      "movies"
    `,
    padding: theme.spacing.unit,
  },
})

HomePage.propTypes = propTypes;

export default withStyles(styles)(HomePage)
