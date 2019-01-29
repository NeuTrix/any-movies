// Stateful. takes commmentable props & ret. any array of comments for display
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { withStyles } from '@material-ui/core/styles';

import CommentsList from './CommentsList';

const propTypes = {
  classes: PropTypes.instanceOf(Object).isRequired, // for MUI styling
  // comments: PropTypes.instanceOf(Array).isRequired, // comments for related item
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
    // if ( this.state.comments.length > 0) {
      this.getComments(commentableID, commentableType)
    // }
  }

  //  set a controller in API to find the id for this movie
  // search by imdbID
  getComments(id, type) {


    // this.setState({comments: [1,2,3]})
    
    // console.log('XXX---CCont props==>', this.props)

    let pathType = type === 'Movie' ? 'movies' : 'comments'

    axios.get(`/api/${pathType}/${id}/comments`)
      .then(resp => {
        const data = resp.data;
        // terminate a recurssive search if no or empty data object returned
        if (data && data.length > 1) {
          console.log('==> Returned data: ',data);

          this.setState({
              comments: data
            });
          }
      })
      .catch(err => {
        console.log('ERROR=>',err);
      })
  }

  render() {
    const { classes, commentableID, commentableType } = this.props
    const { comments } = this.state

    // let display
    // if (comments && comments.length > 0) {
    //   display =  <CommentsList comments={comments}/>
    // } 
    
    return (
      <div className={classes.main}>
       
        THE LENGTH IS: {comments.length}

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

CommentableContainer.propTypes = propTypes;

export default withStyles(styles)(CommentableContainer)