// to provide a list of comments for main display area
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles'; 
import CommentCard from './CommentCard';

const propTypes = {
  classes: PropTypes.instanceOf(Object).isRequired,
  comments: PropTypes.instanceOf(Array).isRequired,
}

function CommentsList(props) {
    const { classes, comments } = props
    // let commentsList = [];

    // if (comments.length) {
      const commentsList = comments.map(com => {
        return ( <li key={com.id}> 
          <CommentCard 
            comment={com}
            // commentableID={com.id}
            // commentableType='Comment'
          /> 
        </li>) })
    // }`
    
    return (
      <div className={classes.main}>
        <h3> Comments </h3>
        <span> { commentsList } </span>
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
