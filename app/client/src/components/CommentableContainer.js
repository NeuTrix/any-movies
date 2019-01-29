// provide the container to grab comments for a movie or a comment type
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import axios from 'axios';
import CommentsList from './CommentsList';

// include props declartaions (classes)

const propTypes = {
  classes: PropTypes.instanceOf(Object).isRequired,
  // comments: PropTypes.instanceOf(Object).isRequired,
  commentableId: PropTypes.string.isRequired,
  commentableType: PropTypes.string.isRequired,
}

class CommmentableContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      comments: {},
    }
    this.getComments = this.getComments.bind(this);
  }

  componentDidMount() {
    const { commentableId, commentableType } = this.props
      this.getComments(commentableId, commentableType)
  }

  //  set a controller in API to find the id for this movie
  // search by imdbID
  getComments(id, type) {

    let pathType = type === 'Movie' ? 'movies' : 'comments'

    axios.get(`/api/${pathType}/${id}/comments`)
      .then(resp => {
        console.log('xxxxxx++>>',resp);
        const data = resp.data;
        this.setState({
          comments: data
        });

      })
      .catch(err => {
        console.log('ERROR=>',err);
      })
  }

  render() {
    const { classes } = this.props
    const { comments } = this.state

    let display
    if (comments && comments.length > 0) {
      display =  <CommentsList comments={comments}/>
    } 
    
    return (
      <div className={classes.main}>
        <h3> Comments Container </h3>
        {/* <p> the commentable id is: {commentableId} </p> */}
        {/* <p> the type is: {commentableType} </p> */}
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