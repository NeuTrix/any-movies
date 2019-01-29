// to provide a list of comments for main display area
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles'; 
import Comment from './Comment';

// include props declartaions (classes)
const propTypes = {
  classes: PropTypes.instanceOf(Object).isRequired,
  comments: PropTypes.instanceOf(Array).isRequired,
}

function CommentsList(props) {
    const { classes, comments } = props
    let commentsList = [];

    if (comments) {
       commentsList = comments.map(com => {
        return ( <li key={com.id}> 
          <Comment comment={com}/> 
        </li>) })
    }
    
    return (
      <div className={classes.main}>
        <h3> Comments List </h3>
        {/* <p>{`Hi  List is ${comments.length} long`}</p> */}
        <span> {commentsList} </span>
      </div>
    )
}

const styles = {
  main: {
    background: 'aliceblue',
    display: 'grid',
    gridTemplateAreas: `"list"`,
    margin: 5,
  }
}

CommentsList.propTypes = propTypes;

export default withStyles(styles)(CommentsList)
