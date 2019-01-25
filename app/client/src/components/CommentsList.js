// to provide a list of comments for main display area
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles'; // import axios from 'axios'

// include props declartaions (classes)

function CommentsList(props) {
    const { classes, comments } = props

    const commentsList = comments.map(com => {
     return <li key={com.id}> {com.body} </li>
    })
    
    return (
      <div className={classes.main}>
        <h1> Comments Container </h1>
        <ul> {commentsList} </ul>
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