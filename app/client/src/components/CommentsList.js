// to provide a list of comments for main display area
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles'; // import axios from 'axios'

// include props declartaions (classes)

function CommentsList(props) {
  return (
    <div>
      <h2> Commments list </h2>
    </div>
  )
}

const styles = {
  grid: {
    display: 'grid',
    gridAreas: `"list"`
  }
}

export default withStyles(styles)(CommentsList)