// Returns a JSON array comment objects, if any, for a commentable item
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import axios from 'axios';
import CommentsList from './CommentsList';

const propTypes = {
  classes: PropTypes.instanceOf(Object).isRequired,
  comId: PropTypes.string.isRequired,
  comType: PropTypes.string.isRequired,
}

class CommentableContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      comments: [],
    }
    this.getComments = this.getComments.bind(this);
  }

  componentDidReceiveProps() {
    const { comId, comType } = this.props
    // if ( this.state.comments.length > 0) {
      this.getComments(comId, comType)
    // }
  }

  //  set a controller in API to find the id for this movie
  // search by imdbID
  getComments(id, type) {
    console.log('XXX---CCont props==>', this.props)

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
    const { classes, comId, comType } = this.props
    const { comments } = this.state

    // let display
    // if (comments && comments.length > 0) {
    //   display =  <CommentsList comments={comments}/>
    // } 
    
    return (
      <div className={classes.main}>
        {/* <h3> Comments Container </h3>
        <p> @the commentable id is: {comId} </p>
        <p> @the type is: {comType} </p> */}
        {/* { display } */}
        <CommentsList comments={comments}/>
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