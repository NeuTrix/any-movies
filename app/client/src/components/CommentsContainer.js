import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
// import axios from 'axios'

// include props declartaions (classes)

class CommmentsContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }

  // comp will mount to capture the incoming data
  // implement redux to hold onto state

  render() {
    const { classes } = this.props
    return (
      <div className={classes.grid}>
        <h1> Hello </h1>
      </div>
    )
  }
}

const styles = {
  grid: {
    display: 'grid',
    gridAreas: `"list"`
  }
}

export default withStyles(styles)(CommmentsContainer)