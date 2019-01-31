// container to gather movie logic
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import CommentsList from './CommentsList';

const propTypes = {
  commentable_id: PropTypes.string.isRequired,
  commentable_type: PropTypes.string.isRequired,
  curr_user: PropTypes.instanceOf(Object).isRequired,
}

class CommentableContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      comments: [], // generated comments for this instance
    }

    this.addComment = this.addComment.bind(this);
    this.getComments = this.getComments.bind(this)
  }
  
  // immutably set state for comments
  componentDidMount() {
    // const { commentable_id, commentable_type } = this.props;
    this.setState((state, props) => {
      this.getComments();
    })
  }

  componentDidUpdate(prevProps) {
    if ( prevProps.commentable_id !== this.props.commentable_id) {
      this.getComments();
    }
  }

  addComment(data) {
    const { commentable_id, commentable_type, curr_user } = this.props;
    
    // update the data object with required fields
    data.commentable_id = commentable_id;
    data.commentable_type = commentable_type;
    data.user_id = curr_user.id;

    // refactor:  comments have a type (from my api).  movies (OMDB) don't
    // refactor to ask for type, if none -> 'movies'
    //   // determine rails path for commentable
    let path = commentable_type === 'Movie' ? 'movies' : 'comments'

    return axios.post(`/api/${path}/${commentable_id}/comments`, data)
      .then(resp => {
        alert(`Your comment was added! \n commentable_id: ${resp.data.id}`)
        this.setState({ displayingCommentForm: false });
        return resp.data
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

  // used to populate the comments state object
  getComments() {
    const { commentable_id, commentable_type, curr_user } = this.props;

    // determine rails path for commentable
    let pathType = commentable_type === 'Movie' ? 'movies' : 'comments'

    return axios.get(`/api/${pathType}/${commentable_id}/comments`)
      .then(resp => {
        let comments = resp.data;
        this.setState((state) => {
          // console.log('===>', comments, state.comments)
          return {...state, comments}
        });
        
        // console.log('>>>>', comments, this.state.comments)
        return comments
      })
      .catch(err => {
        alert(`Err...This Movie may not be registered \n ${err}`)
        console.log('ERROR=>', err);

        // reset the comments for an unregistered movie
        this.setState((state) => {
          let comments = [];
          return { ...state, comments }
        });
      })
  }

   render() {
    const { comments, curr_user } = this.state;
    return <CommentsList comments={comments} curr_user={curr_user} />
  }
}

CommentableContainer.propTypes = propTypes;

export default CommentableContainer
