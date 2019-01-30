//  Should abstract out view from logic for Cards

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

// material UI components
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

// custom components
import CommentContainer from './CommentableContainer';
import AddCommentableForm from "./AddCommentableForm";

const propTypes = {
  classes: PropTypes.instanceOf(Object).isRequired,
  comment: PropTypes.instanceOf(Object).isRequired,
  toggleCommentForm: PropTypes.func.isRequired, // toggles the addComment form in view
}

class CommentCard extends Component {

  constructor(props) {
    super(props)
    this.state = {
      displaySubComments: true,
      showCommentForm: false,
    }
    this.addComment = this.addComment.bind(this);
    this.toggleSubComments = this.toggleSubComments.bind(this);
    this.toggleCommentForm = this.toggleCommentForm.bind(this);
  }

  toggleSubComments(prevState) {
    // toggle displaySubComments
    this.setState({ displaySubComments: !this.state.displaySubComments  });
  }

  addComment(data) {
    const { movie, movieType, userID, movieRegistered } = this.state;

    // veerify registration for movie comments only. (not comments/comments)
    if (!movieRegistered) {
      this.registerMovie();
    }
    // update the data object with required fields
    data.commentable_id = movie.imdbID;
    data.commentable_type = movieType;
    data.user_id = userID;

    return axios.post(`/api/movies/${movie.imdbID}/comments`, data)
      .then(resp => {
        alert(`Your comment was added! \n comment_id: ${resp.data.id}`)
        this.setState({ showForm: false });
        return resp.data
      })
      .catch(err => { 
        alert (`There was a problem adding your comment. \n ${err}`)
        console.log('ERROR=>',err); 
      })
  }

  // allows the addCommentableForm to toggle on and off
  toggleCommentForm() {
    this.setState({
      showCommentForm: !this.state.showCommentForm
    });
  }

  render() {  
    const { classes, comment } = this.props;
    const { showCommentForm, displaySubComments } = this.state;

    let SubComments = ( 
      <CommentContainer
        movieID={comment.id}
        commentableType="Comment"
      />
    )

    return (
      <Card className={classes.card}>

        <CardContent>

          <Typography variant="subtitle" component="h2">
            { comment.title}
          </Typography>

          <Typography className={classes.title} color="textSecondary" gutterBottom>
          </Typography>

          <Typography className={classes.pos} color="textSecondary">
            by: { comment.author }
          </Typography>

          <Typography variant="body1" component="p">
            { comment.body }
          </Typography>

        </CardContent>

        <CardActions className={classes.actions} >
          <Button size="small" onClick={this.toggleCommentForm} >reply</Button>
        </CardActions>

        <CardActions className={classes.actions} >
          <CommentContainer
            commentableID = { comment.id }
            commentableType = "Comment" 
          />
        </CardActions>
        
        <CardContent>
          { showCommentForm && <AddCommentableForm/> }
          {/* <AddCommentableForm/> */}
        </CardContent>
          
      </Card>
    );
  }
}

const styles = theme => ({
  actions: {
    displaySubComments: 'inline-flex',
  },

  card: {
    // gridTemplateAreas
    minWidth: 350,
    marginBottom: theme.spacing.unit,
  },
  pos: {
    marginBottom: 12,
  },
});

CommentCard.propTypes = propTypes;

export default withStyles(styles)(CommentCard);
