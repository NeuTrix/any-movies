import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CommentsContainer from './CommentsContainer';
import MoviesContainer from './MoviesContainer';

// include props declartaions (classes)

class MainDisplay extends Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }

  render() {
    const { classes } = this.props
    return (
      <div className={classes.grid}>
        <h1 className={classes.title}>
          Main Display Area 
        </h1>

        <div className={classes.comments}>
          <CommentsContainer/>
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
      "comments" 
      "movies"
    `,
    padding: 5,
    margin: 10,
    width: 350,
  },

  comments: {
    background: 'orangered',
    gridArea: 'comments',
  },

  movies: {
    background: 'lime',
    gridArea: 'movies',
  }
}


export default withStyles(styles)(MainDisplay)