// container to gather Comment logic
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import CommentsPage from './CommentsPage';
import CommentCard from './CommentCard';

const propTypes = {
  comments: PropTypes.instanceOf(Object), // a possible list of curr comments
  commentable: PropTypes.instanceOf(Object).isRequired, // comment belongs to...
  curr_user: PropTypes.instanceOf(Object).isRequired,
}

const defaultProps ={
  comments: [],
}

class CommentableContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      comments: [], // generated sub comments for this instance
    }
    // CRUD functions
    this.addComment = this.addComment.bind(this); // Create
    this.editComment = this.editComment.bind(this) // Update
    this.getComments = this.getComments.bind(this) // Read
    this.deleteComment = this.deleteComment.bind(this) // Delete
  }

  componentDidUpdate(prevProps, prevState) {
  // need better logic=- how to get commentable id?
   if (prevProps.comments.length !== this.props.comments.length) {
      this.getComments();
    } 
  } 

  // DRY up the duplicate code in add and edit
  addComment({ commentable, data }) {

    let url
    if (commentable.commentable_type) {
      url = `/api/comments/${commentable.id}/comments`
    } else {
      url = `/api/movies/${commentable.imdbID}/comments`
    }

    return axios.post(url, data)
      .then(resp => {
        alert(`Your comment was added! \n commentable id: ${resp.data.id}`)
        return resp.data
      })
      .then(() => {
        // update the subcomments object
        this.setState({ displayingCommentForm: false });
      })
      .catch(err => { 
        alert (
          `There was a problem adding your comment. 
          \n "CommentableContainer"
          \n ${err}`
        )
        console.log('ERROR=>',err); 
      })
  }

  editComment({commentable, data}) {

    return axios.put(`/api/comments/${commentable.id}`, data)
      .then(resp => {
        this.setState({ displayingCommentForm: false }); 
        if (resp.status === 200) {
          alert(`Your comment was EDITED! \n Status code: ${resp.status} \n commentable_id: ${resp.data.id}`)
        } else {
          alert(`Caution. Status code ${resp.status}`)
        }
        return resp.data
      })
      .then(() => {
        // update the subcomments object
        this.getComments();
      })
      .catch(err => {
        alert(`There was a problem editing your comment. \n "CommentableContainer" \n ${err}`)
        console.log('ERROR=>', err);
      })
  }

  deleteComment(id) {

    return axios.delete(`/api/comments/${id}`)
      .then(resp => {
        this.setState({ displayingCommentForm: false });
        // -> make another .then to reply upon confirmatio or status vs alert
        if (resp.status === 204) {
          alert(`Your comment was deleted! \n Status code: ${resp.status} \n commentable_id: ${resp.data.id}`)
        } else {
          alert(`Caution. Status code ${resp.status}`)
        }
        return resp.data
      })
      .catch(err => { 
        alert ( `There was a problem deleting your comment. \n "CommentableContainer" \n ${err}`)
        console.log('ERROR=>',err); 
      })
  }

  // used to populate the comments state object
  getComments() {
    const { commentable } = this.props;
    let url
    if (commentable.commentable_type) {
      url = `/api/comments/${commentable.id}/comments`
    } else {
      url = `/api/movies/${commentable.imdbID}/comments`
    }

    return axios.get(url)
      .then(resp => {
        let comments = resp.data;
        this.setState((state) => {
          return {...state, comments}
        });
        
        return comments
      })
      .catch(err => {
        console.log('ERROR=>', err);

        this.setState((state) => {
          let comments = [];
          return { ...state, comments }
        });
      })
  }

  render() {
    //  dconstruct props
    const { 
      commentable, 
      curr_user 
    } = this.props;
 
    // build comment cards
    const commentsList = this.state.comments.map(comment => {
      // should consider spreading props from the parent instead
      return ( 
        <div key={comment.id}> 
          <CommentCard 
            commentable={comment} 
            commentable_id={comment.commentable_id} 
            commentable_type={comment.commentable_type} 
            curr_user={curr_user}
            addComment={this.addComment}
            deleteComment={this.deleteComment}
            editComment={this.editComment}
          /> 
        </div>
      ) 
    })
    
    return (
      <CommentsPage 
        commentsList={commentsList} 
        curr_user={curr_user} 
        handleGetComments={this.getComments} // get items for this commentable
      />
    )
  }
}

CommentableContainer.propTypes = propTypes;
CommentableContainer.defaultProps = defaultProps;

export default CommentableContainer