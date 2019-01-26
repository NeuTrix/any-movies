// provide the container to grab comments for a movie or a comment type
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import axios from 'axios';
import CommentsList from './CommentsList';

// include props declartaions (classes)

const propTypes = {
  commentableId: PropTypes.number.isRequired,
  commentableType: PropTypes.string.isRequired,
  classes: PropTypes.instanceOf(Object).isRequired,
}

class CommmentableContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      comments: [],
    }
  }
    // make proxy call to retrieve comments from the api
   componentDidMount() {
     const { commentableId, commentableType } = this.props;
     // set the path to either movies or comments
      let path
      commentableType === 'Movie' 
        ? path = 'movies'
        : path = 'comments'

     axios.get(`/api/${path}/${commentableId}/comments`)
      .then(resp => {
        console.log("==> here's the object", resp);
        this.setState({ comments: resp.data });
      })
      .catch(err => console.log(err))
   }

  render() {
    const { classes, commentableId, commentableType } = this.props
    const { comments } = this.state
    let display
    if (comments.length > 0) {
      display =  <CommentsList comments={comments}/>
    } 
    
    return (
      <div className={classes.main}>
        <h3> Comments Container </h3>
        <p> the id is: {commentableId} </p>
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