//  Should abstract out view from logic for Cards
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
  deleteComment: PropTypes.func.isRequired, // adds a new review instance to api
  editComment: PropTypes.func.isRequired, // adds a new review instance to api
}

class CommentCard extends Component {

  constructor(props) {
    super(props)
    this.state = {
      // comments: [],
      displaySubComments: true,
      showNewCommentForm: false,
      showEditCommentForm: false,
    }

    this.toggleSubComments = this.toggleSubComments.bind(this);
    this.toggleNewCommentForm = this.toggleNewCommentForm.bind(this);
    this.toggleEditCommentForm = this.toggleEditCommentForm.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  // using this?
  toggleSubComments(prevState) {
    // toggle displaySubComments
    this.setState({ displaySubComments: !this.state.displaySubComments  });
  }

  // allows the addCommentableForm to toggle on and off
  toggleNewCommentForm() {
    this.setState({ showNewCommentForm: !this.state.showNewCommentForm });
  }

  // allows the editCommentableForm to toggle on and off
  toggleEditCommentForm() {
    this.setState({ showEditCommentForm: !this.state.showEditCommentForm });
  }
  // Read, Create and Update/Edit actions handled in form via CommentsPage
  handleDelete(e) {  
    e.preventDefault();
    const { commentable } = this.props
    this.props.deleteComment(commentable.id)
  }
  handleEdit(e) {  
    e.preventDefault();
    const { commentable } = this.props
    this.props.eidtComment(commentable.id)
  }

  render() {  
    const { 
      addComment, 
      deleteComment, 
      editComment,
      classes, 
      commentable, 
      commentable_id, 
      commentable_type, 
      curr_user
    } = this.props;
    const { showNewCommentForm, showEditCommentForm } = this.state;
   
    const newCommentForm = (
      <CommentableForm 
        commentable={commentable}
        commentable_id={commentable_id}
        commentable_type={commentable_type}
        curr_user={curr_user}
        submitAction={addComment}
        toggleForm={this.toggleNewCommentForm}
      /> 
    )

    const editCommentForm = (
      <CommentableForm 
        commentable={commentable}
        commentable_id={commentable_id}
        commentable_type={commentable_type}
        curr_user={curr_user}
        submitAction={editComment}
        editMode="true"
        toggleForm={this.toggleEditCommentForm}
        
      /> 
    )

    return (
      <Card className={classes.grid}>

        <CardContent>

          <div
            className={classes.title}
            style={{ gridArea: 'title'}}
          >
            <Typography variant="subtitle" component="h2">
              { commentable.title}
            </Typography>

            <Typography ccolor="textSecondary" gutterBottom>
              by: { commentable.author }
            </Typography>

            <Typography className={classes.pos} color="textSecondary">
              comment_id: { commentable.id}
            </Typography>

          </div>

          <Typography variant="body1" component="p">
            { commentable.body }
          </Typography>

        </CardContent>

        <CardActions className={classes.buttons} 
          style={{ gridArea: 'reply'}}
        >
          <Button size="small" onClick={this.toggleNewCommentForm} >
            reply
          </Button>
          
          <Button size="small" onClick={this.handleDelete} >
             delete 
          </Button>
          
          <Button size="small" onClick={this.toggleEditCommentForm} >
             edit 
          </Button>
          
        </CardActions>

        <CardActions 
          className={classes.actions} 
          style={{ gridArea: 'response'}}
        >
        
         <CommentableContainer 
            commentable={commentable}
            // comments={comments}
            commentable_id={commentable_id}
            commentable_type={"Comment"}
            curr_user={curr_user}
          />
        </CardActions>
        
        <CardContent style={{ gridArea: 'form'}} >
          { showNewCommentForm && newCommentForm }
          { showEditCommentForm && editCommentForm }
        </CardContent>
          
      </Card>
    );
  }
}

const styles = theme => ({
  actions: {
    display: 'inherit',
  },

  grid: {
    display: 'grid',
    gridTemplateAreas:`
      "title title"
      "reply reply"
      "form form"
      "response response"
    `,
    border: '2px solid lime',

    // margin: 'none',
    marginBottom: theme.spacing.unit,
  },
  pos: {
    marginBottom: 12,
  },
});

CommentCard.propTypes = propTypes;

export default withStyles(styles)(CommentCard);
