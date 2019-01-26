// provide the container to grab comments for a movie or a comment type
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import axios from 'axios';
import CommentsList from './CommentsList';

// include props declartaions (classes)

const propTypes = {
  commentable_id: PropTypes.number.isRequired,
  commentable_type: PropTypes.string.isRequired,
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
     axios.get('/api/comments')
      .then(resp => {
        console.log("==> here's the object", resp);
        this.setState({ comments: resp.data });
      })
      .catch(err => console.log(err))
   }

  render() {
    const { classes, imdbId } = this.props
    const { comments } = this.state

    return (
      <div className={classes.main}>
        <h1> Comments Container </h1>
        the id is: {imdbId}
        <CommentsList comments={comments}/>
      </div>
    )
  }
}

const styles = {
  main: {
    padding: 5,
  }
}

CommmentableContainer.propTypes = propTypes;

export default withStyles(styles)(CommmentableContainer)