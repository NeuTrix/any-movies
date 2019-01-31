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

// should consider spreading props from the parent instead 
const propTypes = {
  classes: PropTypes.instanceOf(Object).isRequired, // material UI
  comments: PropTypes.instanceOf(Array), // from commentable
  commentable_id: PropTypes.string.isRequired,
  commentable_type: PropTypes.string.isRequired,
  curr_user: PropTypes.instanceOf(Object).isRequired, //mocked.Will be from auth
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
    const { commentable, curr_user } = this.props;

    // update the data object with required fields. The rest is in the form data
    data.commentable_id = commentable.id;
    data.commentable_type = commentable.type === 'Comment' || 'Movie';
    data.user_id = curr_user.id;

    return axios.post(`/api/comments/${commentable.id}/comments`, data)
      .then(resp => {
        this.setState({ showCommentableForm: false });
        alert(`Your comment was added! \n comment_id: ${resp.data.id}`)
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
    const { classes, commentable, curr_user} = this.props;
    const { showCommentForm, displaySubComments } = this.state;

    const CommentCommentForm =(
      <CommentableForm 
        curr_user={curr_user}
        commentable={commentable}
        addCommentable={this.addComment} 
      /> 
    )

    return (
      <Card className={classes.card}>

        <CardContent>

          <Typography variant="subtitle" component="h2">
            { commentable.title}
          </Typography>

          <Typography className={classes.title} color="textSecondary" gutterBottom>
          </Typography>

          <Typography className={classes.pos} color="textSecondary">
            by: { commentable.author }
          </Typography>

          <Typography variant="body1" component="p">
            { commentable.body }
          </Typography>

        </CardContent>

        <CardActions className={classes.actions} >
          <Button size="small" onClick={this.toggleCommentForm} >reply</Button>
        </CardActions>

        <CardActions className={classes.actions} >
          <CommentContainer
            commentable_id = { commentable.id }
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
