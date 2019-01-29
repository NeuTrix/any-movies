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
      <div> ===================== </div>
      <h4> {comment.title} </h4>
      <div> Author: {comment.author} </div>
      <div> {comment.body} </div>
      <div> THis is: {comment.id} </div>
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
    margin: 15,
    outline: '2px solid blue',
  }
}

export default withStyles(styles)(Comment);