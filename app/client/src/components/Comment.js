import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CommentableContainer from './CommentableContainer';

const propTypes = {
  classes: PropTypes.instanceOf(Object).isRequired,
  comment: PropTypes.instanceOf(Object).isRequired,
}


function Comment(props) {
  const {classes, comment } = props;
  return (
    <div className={classes.main}>
    <p> ===================== </p>
      <h3> {comment.title} </h3>
      <h4> Author: {comment.author} </h4>
      <p> {comment.body} </p>
      THis is: {comment.id}
       <CommentableContainer 
          commentableId={comment.id}
          commentableType='Comment'
        />
    </div>
    );
}
 
const styles = {
  main: {
    background: 'lightgreen',
  }
}

export default withStyles(styles)(Comment);