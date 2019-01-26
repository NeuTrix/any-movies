import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CommentsContainer from './CommentsContainer';

function Comment(props) {
  const {classes, comment } = props;
  return (
    <div className={classes.main}>
      <h3> {comment.title} </h3>
      <h4> Author: {comment.author} </h4>
      <p> {comment.body} </p>
      {/* <p> {comment.comments} </p> */}
      {/* <CommentsContainer/> */}
    </div>
    );
}
 
const styles = {
  main: {
    background: 'lightgreen',
  }
}

export default withStyles(styles)(Comment);