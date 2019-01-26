// to provide a list of comments for main display area
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles'; 
import Comment from './Comment';

// include props declartaions (classes)

function CommentsList(props) {
    const { classes, comments } = props

    const commentsList = comments.map(com => {
     return (
      <li key={com.id}> 
        <Comment comment={com}/>
      </li>)
    })
    
    return (
      <div className={classes.main}>
        <h1> Comments List </h1>
        <ul> {commentsList} </ul>
      </div>
    )
}

const styles = {
  main: {
    background: 'aliceblue',
    display: 'grid',
    gridTemplateAreas: `"list"`
  }
}

export default withStyles(styles)(CommentsList)