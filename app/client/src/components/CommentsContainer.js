// provide the data grabbing logic for the list
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import axios from 'axios';
import CommentsList from './CommentsList';

// include props declartaions (classes)

class CommmentsContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      comments: [],
    }
  }
    // make proxy call to retrieve comments from the api
   componentDidMount() {
     axios.get('/api/comments')
       .then(resp => {
         console.log("==> here's the object", resp);
         this.setState({
           comments: resp.data
         });
       })
       .catch(err => console.log(err))
   }

  render() {
    const { classes } = this.props
    const { comments } = this.state

    const commentsList = comments.map(com => {
     return (
        <li key={com.id}>
          {com.body}
        </li>
      )}
    )
    
    return (
      <div className={classes.main}>
        <h1> Comments Container </h1>
        <ul> {commentsList} </ul>
        <CommentsList/>
      </div>
    )
  }
}

const styles = {
  main: {
    padding: 5,
  }
}

export default withStyles(styles)(CommmentsContainer)