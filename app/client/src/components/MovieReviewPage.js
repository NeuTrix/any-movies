import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CommentableContainer from './CommentableContainer';
import MoviesContainer from './MoviesContainer';

// include props declartaions (classes)

const propTypes = {
  classes: PropTypes.instanceOf(Object).isRequired,
  // acquire through movie Api and pass down
  movie: PropTypes.instanceOf(Object).isRequired,
}

class MainDisplay extends Component {
  constructor(props) {
    super(props)
    this.state = {
      movie_imbd: '',
      
    }
  }

  render() {
    const { classes, movie } = this.props
    return (
      <div className={classes.grid}>
        <h1 className={classes.title}>
         Movie Review Page
        </h1>
        <div className={classes.search}>
          Search
        </div>
        <div className={classes.comments}>
          <CommentableContainer/>
        </div>
        <div className={classes.movies}>
          <MoviesContainer/>
        </div>
      </div>
    )
  }
}

const styles = {
  grid: {
    display: 'inline-grid',
    gridTemplateAreas: `
      "title"
      "search"
      "comments" 
      "movies"
    `,
    padding: 5,
    margin: 10,

  },

  comments: {
    background: 'orangered',
    gridArea: 'comments',
  },

  movies: {
    background: 'lime',
    gridArea: 'movies',
  },

  search:{
    background: 'violet',
    gridArea: 'search',
  }
}


export default withStyles(styles)(MainDisplay)