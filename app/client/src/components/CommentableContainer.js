// Stateful. takes commmentable props & ret. any array of comments for display
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import CommentsList from './CommentsList';

const propTypes = {
  commentableID: PropTypes.string.isRequired,
  commentableType: PropTypes.string.isRequired,
}

class CommentableContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      comments: [],
    }
    // this.getComments = this.getComments.bind(this);
  }
  // call this the first time the component mounts to set state
  componentDidMount() {
    const { commentableID, commentableType } = this.props
    this.getComments(commentableID, commentableType)
  }

  componentDidUpdate(prevProps) {
    const { commentableID, commentableType } = this.props

    if (prevProps.commentableID !== this.props.commentableID ) {
      this.getComments(commentableID, commentableType)
    }
  }
  // fetch comments from the api
  getComments(id, type) {
    let pathType = type === 'Movie' ? 'movies' : 'comments'

    axios.get(`/api/${pathType}/${id}/comments`)
      .then(resp => {
        const data = resp.data;
        this.setState({ comments: data }); 
      })
      .catch(err => { console.log('ERROR=>',err); })
  }

  render() {
    return (
      <CommentsList comments={this.state.comments}/>
    )
  }
}

CommentableContainer.propTypes = propTypes;

export default CommentableContainer
// export default withStyles(styles)(CommentableContainer)