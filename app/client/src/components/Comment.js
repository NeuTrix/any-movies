import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CommentableContainer from './CommentableContainer';

const propTypes = {
  classes: PropTypes.instanceOf(Object).isRequired,
  comment: PropTypes.instanceOf(Object).isRequired,
  commentableID: PropTypes.number.isRequired,
  commentableType: PropTypes.string.isRequired,
}

function Comment(props) {
  const {
    classes,
    comment,
    commentableID,
    commentableType,
  } = props;
  return (
    <div className={classes.main}>
      <div> ===================== </div>
      <h4> {comment.title} </h4>
      <div> Author: {comment.author} </div>
      <div> {comment.body} </div>
      <div> This is: {comment.id} </div>

       <CommentableContainer 
          commentableId={commentableID}
          commentableType={commentableType}
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
