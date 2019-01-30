// Stateful. takes commmentable props & ret. any array of comments for display
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import CommentsList from './CommentsList';

const propTypes = {
  // when marked as 'required' generating a console warning
  commentableID: PropTypes.string,
  commentableType: PropTypes.string.isRequired,
  movieTitle: PropTypes.string.isRequired,
  movieRegistered: PropTypes.string.isRequired,
}

class CommentableContainer extends Component {
  constructor(props) {
    super(props)

    this.state = {
      comments: [],
    }

    this.addComment = this.addComment.bind(this); // pass to form
    this.getComments = this.getComments.bind(this);
  }
  
  componentDidMount() {
    this.getComments()
  }

  componentDidUpdate(prevProps, prevState) {
    const { commentableID, commentableType } = this.props

    if (prevProps.commentableID !== commentableID) {
     this.getComments(commentableID, commentableType)
    }
  }

  addComment(data) {
     const {
       commentableID,
       commentableType,
       userID,
       movieRegistered
     } = this.state;

     // veerify registration
     if (!movieRegistered) {
       this.registerMovie();
     }
     // update the data object with required fields
    //  data.commentable_id = commentableID;
    //  data.commentable_type = commentableType;
    //  data.user_id = userID;

     return axios.post(`/api/comments/${commentableID}/comments`, data)
       .then(resp => {
         alert(`Your comment was added! \n comment_id: ${resp.data.id}`)
         this.setState({
           showForm: false
         });
         return resp.data
       })
       .catch(err => {
         console.log('ERROR=>', err);
       })
   }


  getComments(id, type) {
    const { commentableID, commentableType } = this.props
    
    // determine rails path for commentable
    let pathType = commentableType === 'Movie' ? 'movies' : 'comments'

    return axios.get(`/api/${pathType}/${commentableID}/comments`)
      .then(resp => {
        this.setState({ comments: resp.data }); 
        return resp.data
      })
      .catch(err => { 
        // console.log('ERROR=>',err); 
        console.log('Movie not registered')
        // reset the comments for an unregistered movie
        this.setState({ comments: [] }); 
      })
  }

  render() {
    return ( 
      <CommentsList 
        comments={this.state.comments}
      />
    )
  }
}

CommentableContainer.propTypes = propTypes;

export default CommentableContainer
