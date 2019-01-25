import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

// include props declartaions (classes)

class MoviesContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }

  render() {
    const { classes } = this.props
    return (
      <div className={classes.grid}>
        <h1> Movies Container </h1>
      </div>
    )
  }
}

const styles = {
  grid: {
    // display: 'grid',
  }
}

export default withStyles(styles)(MoviesContainer)