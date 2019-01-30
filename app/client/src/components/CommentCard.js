import React, { Component } from 'react';
import PropTypes from 'prop-types';

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
      displayComments: true,
      showCommentForm: false,
    }
    this.getSubComments = this.getSubComments.bind(this);
    this.toggleCommentForm = this.toggleCommentForm.bind(this);
  }

  getSubComments(prevState) {
    // toggle displayComments
    this.setState({ displayComments: !this.state.displayComments  });
  }

  // allows the addReview form to toggle on and off
  toggleCommentForm() {
    this.setState({
      showCommentForm: !this.state.showCommentForm
    });
  }

  render() {  
    const { classes, comment } = this.props;
    const { showCommentForm, displayComments } = this.state;

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
    displayComments: 'inline-flex',
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
