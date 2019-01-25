import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import axios from 'axios'

// include props declartaions (classes)

class CommmentsContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      comments: [],
    }
  }

  // comp will mount to capture the incoming data
  // implement redux to hold onto state
  // componentDidMount(){
  //   axios.get('api/comments')
  //   .then( resp => {
  //     console.log(resp)
  //     this.setState({comments: resp.data})
  //   })
  //   .catch(err => console.log(err))
  // }

   componentDidMount() {
     axios.get('api/comments')
       .then(resp => {
         console.log("it worked?");
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
      <div className={classes.grid}>
        <h1> Comments Container </h1>
        <ul> {commentsList} </ul>
      </div>
    )
  }
}

const styles = {
  grid: {
    // display: 'grid',
    padding: 5,
  }
}

export default withStyles(styles)(CommmentsContainer)