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
import CommentableForm from "./CommentableForm";

const propTypes = {
  classes: PropTypes.instanceOf(Object).isRequired,
  comment: PropTypes.instanceOf(Object).isRequired,
  userID: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
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
    const { comment, userID, username } = this.props;

    // update the data object with required fields. The rest is in the form data
    data.commentable_id = comment.id;
    data.commentable_type = 'Comment';
    data.user_id = userID;

    return axios.post(`/api/comments/${comment.id}/comments`, data)
      .then(resp => {
        alert(`Your comment was added! \n comment_id: ${resp.data.id}`)
        this.setState({ showCommentableForm: false });
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
    const { classes, comment, username, userID } = this.props;
    const { showCommentForm, displaySubComments } = this.state;

    const CommentCommentForm =(
      <CommentableForm 
        author={username} 
        addCommentable={this.addComment} 
        userID={userID}
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
            commentable_id = { comment.id }
            commentableType = "Comment" 
          />
        </CardActions>
        
        <CardContent>
          { showCommentForm && CommentCommentForm }
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
