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
      imdbId: '',
    }
    this.searchMovie = this.searchMovie.bind(this)
  }

  // find a movie to review
  searchMovie() {
    //  search the api
    // set the imdb id for state from the search item
    this.setState({imdbId: 'tt0078748'})
  }

  render() {
    const { classes } = this.props
    const { imdbId } = this.state
    return (
      <div className={classes.grid}>
        <h1 className={classes.title}>
         Movie Review Page
        </h1>
        <div className={classes.search} >
          <button onClick={this.searchMovie}>
            Search
          </button>
        </div>
        <div className={classes.comments}>
          <CommentableContainer imdbId={imdbId}/>
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