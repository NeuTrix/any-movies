// Stateful. takes commmentable props & ret. any array of comments for display
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import CommentsList from './CommentsList';

const propTypes = {
  curr_user: PropTypes.instanceOf(Object).isRequired,
  comments: PropTypes.instanceOf(Object).isRequired,
  commentable_id: PropTypes.string,
  commentable_type: PropTypes.string.isRequired,
}

class CommentableContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      //  comments: [], 
      }
    // this.getComments = this.getComments.bind(this);
  }
  
  componentDidMount() {
    // this.getComments()
  }

  componentDidUpdate(prevProps, prevState) {
    // const { commentable_id, commentable_type } = this.props

    // // if (prevProps.commentable_id !== commentable_id) {
    //  this.getComments(commentable_id, commentable_type)
    // }
  }

  // getComments(id, type) {
  //   const { commentable_id, commentable_type } = this.props
    
  //   // determine rails path for commentable
  //   let pathType = commentable_type === 'Movie' ? 'movies' : 'comments'

  //   return axios.get(`/api/${pathType}/${commentable_id}/comments`)
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
    const { comments, curr_user } = this.props;
    // console.log(comments)
    return <CommentsList 
      comments={comments} 
      curr_user={curr_user}
    />
  }
}

CommentableContainer.propTypes = propTypes;

export default CommentableContainer
