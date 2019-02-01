//  Should abstract out view from logic for Cards
import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import axios from 'axios';
// material UI components
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
// custom components
import CommentableContainer from './CommentableContainer';
import CommentableForm from "./CommentableForm";/*  */

// should consider spreading props from the parent instead 
const propTypes = {
  classes: PropTypes.instanceOf(Object).isRequired, // material UI
  commentable: PropTypes.instanceOf(Object).isRequired, // material UI
  commentable_id: PropTypes.string.isRequired,
  commentable_type: PropTypes.string.isRequired,
  // comments: PropTypes.instanceOf(Array), // from commentable
  curr_user: PropTypes.instanceOf(Object).isRequired, //mocked.Will be from auth
  // functions
  addComment: PropTypes.func.isRequired, // adds a new review instance to api
  
}

class CommentCard extends Component {

  constructor(props) {
    super(props)
    this.state = {
      // comments: [],
      displaySubComments: true,
      showCommentForm: false,
    }

    // this.addComment = this.addComment.bind(this);
    this.toggleSubComments = this.toggleSubComments.bind(this);
    this.toggleCommentForm = this.toggleCommentForm.bind(this);
  }


  toggleSubComments(prevState) {
    // toggle displaySubComments
    this.setState({ displaySubComments: !this.state.displaySubComments  });
  }

  // allows the addCommentableForm to toggle on and off
  toggleCommentForm() {
    this.setState({
      showCommentForm: !this.state.showCommentForm
    });
  }

  render() {  
    const { addComment, classes, commentable, commentable_id, commentable_type, curr_user} = this.props;
    const { showCommentForm, displaySubComments } = this.state;
   
      const commentableForm = (
        <CommentableForm 
        commentable_id={commentable_id}
        commentable_type={commentable_type}
        curr_user={curr_user}
        addCommentable={addComment} 
      /> 
    )

    return (
      <div className={classes.card}>

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
          { showCommentForm && commentableForm}
        </CardActions>

        <CardActions className={classes.actions} >
        
         <CommentableContainer 
            commentable={commentable}
            // comments={comments}
            commentable_id={commentable_id}
            commentable_type={"Comment"}
            curr_user={curr_user}
          />
        </CardActions>
        
        <CardContent>
          {/* { showCommentForm && commentableForm } */}
        </CardContent>
          
      </div>
    );
  }
}

const styles = theme => ({
  actions: {
    display: 'inline-flex',
  },

  card: {
    // border: '1px solid orangered',

    // margin: 'none',
    marginBottom: theme.spacing.unit,
  },
  pos: {
    marginBottom: 12,
  },
});

CommentCard.propTypes = propTypes;

export default withStyles(styles)(CommentCard);
