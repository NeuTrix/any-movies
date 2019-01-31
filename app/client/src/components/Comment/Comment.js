import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CommentableContainer from './CommentableContainer';

const propTypes = {
  classes: PropTypes.instanceOf(Object).isRequired,
  comment: PropTypes.instanceOf(Object).isRequired,
  commentable_id: PropTypes.number.isRequired,
  commentable_type: PropTypes.string.isRequired,
}

function Comment(props) {
  const {
    classes,
    comment,
    commentable_id,
    commentable_type,
  } = props;
  return (
    <div className={classes.main}>
      <div> ===================== </div>
      <h4> {comment.title} </h4>
      <div> Author: {comment.author} </div>
      <div> {comment.body} </div>
      <div> This is: {comment.id} </div>

       <CommentableContainer 
          // commentable_id={commentable_id}
          // commentable_type={commentable_type}
          commentable_id={comment.id}
          commentable_type='Comment'
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

Comment.propTypes = propTypes;

export default withStyles(styles)(Comment);
