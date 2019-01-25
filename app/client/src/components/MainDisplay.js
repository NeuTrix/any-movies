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
        <h1> Main Display Area </h1>
        {/* <MoviesContainer/>
        <CommentsContainer/> */}
      </div>
    )
  }
}

const styles = {
  grid: {
    display: 'grid',
    gridTemplateAreas: `
      "movies"
      "comments" 
    `,
  },

  comments: {
    gridArea: 'comments',
  },

  movies: {
    gridArea: 'movie',
  }
}


export default withStyles(styles)(MainDisplay)