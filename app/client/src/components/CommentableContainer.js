// Stateful. takes commmentable props & ret. any array of comments for display
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import CommentsList from './CommentsList';

const propTypes = {
  // when marked as 'required' generating a console warning
  commentableID: PropTypes.string,
  commentableType: PropTypes.string.isRequired,
}

class CommentableContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      comments: [],
    }
    this.getComments = this.getComments.bind(this);
  }
  
  componentDidMount() {
    const { commentableID, commentableType } = this.props

    this.getComments(commentableID, commentableType)
  }

  componentDidUpdate(prevProps, prevState) {
    const { commentableID, commentableType } = this.props

    if (prevState.comments && 
        prevProps.commentableID !== commentableID
      ) {
     this.getComments(commentableID, commentableType)
    }
  }

  getComments(id, type) {
    // determine rails path for commentable
    let pathType = type === 'Movie' ? 'movies' : 'comments'

    return axios.get(`/api/${pathType}/${id}/comments`)
      .then(resp => {
        this.setState({ comments: resp.data }); 
        return resp.data
      })
      .catch(err => { 
        console.log('ERROR=>',err); 
      })
  }

  render() {
    return <CommentsList comments={this.state.comments}/>
  }
}

CommentableContainer.propTypes = propTypes;

export default CommentableContainer
