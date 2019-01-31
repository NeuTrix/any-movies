// Stateful. takes commmentable props & ret. any array of comments for display
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import CommentsList from './CommentsList';

const propTypes = {
  curr_user: PropTypes.instanceOf(Object).isRequired,
  commentableID: PropTypes.string,
  commentableType: PropTypes.string.isRequired,
}

class CommentableContainer extends Component {
  constructor(props) {
    super(props)
    this.state = { comments: [], }
    // this.getComments = this.getComments.bind(this);
  }
  
  componentDidMount() {
    // this.getComments()
  }

  componentDidUpdate(prevProps, prevState) {
    const { commentableID, commentableType } = this.props

    if (prevProps.commentableID !== commentableID) {
    //  this.getComments(commentableID, commentableType)
    }
  }

  // getComments(id, type) {
  //   const { commentableID, commentableType } = this.props
    
  //   // determine rails path for commentable
  //   let pathType = commentableType === 'Movie' ? 'movies' : 'comments'

  //   return axios.get(`/api/${pathType}/${commentableID}/comments`)
  //     .then(resp => {
  //       this.setState({ comments: resp.data }); 
  //       return resp.data
  //     })
  //     .catch(err => { 
  //       alert(`Movie may not be registered for comments \n ${err}`)
  //       console.log('ERROR=>',err); 
  //       // reset the comments for an unregistered movie
  //       this.setState({ comments: [] }); 
  //     })
  // }

  render() {
    return <CommentsList 
      comments={this.state.comments} 
      curr_user={this.props.curr_user}
    />
  }
}

CommentableContainer.propTypes = propTypes;

export default CommentableContainer
