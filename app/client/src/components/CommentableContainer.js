// provide the container to grab comments for a movie or a comment type
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import axios from 'axios';
import CommentsList from './CommentsList';

// include props declartaions (classes)

const propTypes = {
  classes: PropTypes.instanceOf(Object).isRequired,
  comments: PropTypes.instanceOf(Object).isRequired,
  commentableId: PropTypes.string.isRequired,
  commentableType: PropTypes.string.isRequired,
}

class CommmentableContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      comments: {},
    }
  }

  render() {
    const { classes, comments, commentableId, commentableType } = this.props

    let display
    if (comments && comments.length > 0) {
      display =  <CommentsList comments={comments}/>
    } 
    
    return (
      <div className={classes.main}>
        <h3> Comments Container </h3>
        <p> the commentable id is: {commentableId} </p>
        <p> the type is: {commentableType} </p>
        { display }
      </div>
    )
  }
}

const styles = {
  main: {
    padding: 5,
    outline: '3px solid purple',
  }
}

CommmentableContainer.propTypes = propTypes;

export default withStyles(styles)(CommmentableContainer)