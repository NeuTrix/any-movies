// container to gather movie logic
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import CommentsPage from './CommentsPage';
import CommentCard from './CommentCard';

const propTypes = {
  comments: PropTypes.instanceOf(Object), //may be passed down from a parent 
	commentable: PropTypes.instanceOf(Object).isRequired, // movie or comment obj
  commentable_id: PropTypes.string.isRequired, // need these props for OMDB objs
  commentable_type: PropTypes.string.isRequired,
  curr_user: PropTypes.instanceOf(Object).isRequired,
}

const defaultProps ={
  comments: [],
}

class CommentableContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      comments: [], // generated comments for this instance
    }

    this.addComment = this.addComment.bind(this);
    this.getComments = this.getComments.bind(this)
    this.deleteComment = this.deleteComment.bind(this)
    // this.editComment = this.editComment.bind(this)
  }

  componentDidMount() {
    this.getComments()
  }

  // update the component if new props recieved
  componentDidUpdate(prevProps, prevState) {

    if ( prevProps.commentable_id !== this.props.commentable_id
     || prevProps.comments.length !== this.props.comments.length
    ) {
      this.getComments();
    } 
  } 

  addComment(data) {
    // 'data' is from the component state
    const { commentable_id, commentable_type } = data;
    
    //   // determine rails path for commentable
    let path = commentable_type === 'Movie' ? 'movies' : 'comments'

    return axios.post(`/api/${path}/${commentable_id}/comments`, data)
      .then(resp => {
        this.setState({ displayingCommentForm: false });
        // -> make another .then to reply upon confirmatio or status vs alert
        alert(`Your comment was added! \n commentable_id: ${resp.data.id}`)
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

  deleteComment(child_id, child_type) {
    alert('in the del comment call')
    console.log(this.state, this.props)
    // const { commentable_id } = this.props
    // let parent_id = this.props.commentable_id
    // // determine rails path for commentable
    // let path = child_type === 'Movie' ? 'movies' : 'comments'

    // return axios.delete(`/api/${path}/${parent_id}/${child_id}`)
    //   .then(resp => {
    //     this.setState({ displayingCommentForm: false });
    //     // -> make another .then to reply upon confirmatio or status vs alert
    //     alert(`Your comment was deleted! \n child_id: ${resp.data.id}`)
    //     return resp.data
    //   })
    //   .catch(err => { 
    //     alert (
    //       `There was a problem deleting your comment. 
    //       \n "CommentableContainer"
    //       \n ${err}`
    //     )
    //     console.log('ERROR=>',err); 
    //   })
  }

  // used to populate the comments state object
  getComments() {
    const { commentable_id, commentable_type } = this.props;

    // determine correct path for commentable
    // not DRY duplicated in other functions
    let path = commentable_type === 'Movie' ? 'movies' : 'comments'

    return axios.get(`/api/${path}/${commentable_id}/comments`)
      .then(resp => {
        let comments = resp.data;
        this.setState((state) => {
          return {...state, comments}
        });
        
        return comments
      })
      .catch(err => {
        alert(`Err... for ${commentable_id} \n This item had an error: \n ${err}`)
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
      commentable_id, 
      commentable_type,  
      curr_user 
    } = this.props;
 
    // build comment cards
    const commentsList = this.state.comments.map(comment => {
      // should consider spreading props from the parent instead
      return ( 
        <div key={comment.id}> 
          <CommentCard 
            commentable={comment} 
            commentable_id={comment.id}
            commentable_type={"Comment"}
            curr_user={curr_user}
            addComment={this.addComment}
            deleteComment={this.deleteComment}
          /> 
        </div>
      ) 
    })
    
    return (
      <CommentsPage 
        commentable={commentable} 
        commentable_id={commentable_id}
        commentable_type={commentable_type} 
        curr_user={curr_user} 

        commentsList={commentsList} 
        handleAddComment={this.addComment} // for form execution
        handleGetComments={this.getComments} // get items for this commentable
      />
    )
  }
}

CommentableContainer.propTypes = propTypes;
CommentableContainer.defaultProps = defaultProps;

export default CommentableContainer