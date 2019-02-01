import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import CommentableForm from './CommentableForm';
import { Button } from '@material-ui/core';

const propTypes = {
  classes: PropTypes.instanceOf(Object).isRequired, // material UI
  commentable: PropTypes.instanceOf(Object).isRequired, // material UI
  commentable_id: PropTypes.string.isRequired, 
  commentable_type: PropTypes.string.isRequired, 
  curr_user: PropTypes.instanceOf(Object).isRequired, // mocked
  commentsList: PropTypes.instanceOf(Array), // from commentable
  // functions
  handleAddComment: PropTypes.func.isRequired, // adds a new comment to the list
  handleGetComments: PropTypes.func.isRequired, // adds a new comment to the list
  // editComment: PropTypes.func.isRequired, // edit a comment in the list
  // deleteComment: PropTypes.func.isRequired, // remove a comment from the list
}

// some commentables may not have comments defined
const defaultProps = {
  commentsList: [],
  curr_user: {username:'mickeyMouse'}
}

class CommentsPage extends Component {
  constructor(props) {
    super(props)

    this.state = {

    }
  }

  render() {
    
    const { 
      classes, 
      commentable_type, 
      commentable_id, 
      commentsList, 
      curr_user, 
      handleAddComment, 
      handleGetComments, 
    } = this.props

    const commentableForm = (
      // generate commentable form for current movie
       <CommentableForm 
        commentable_id={commentable_id}
        commentable_type={"Comment"}
        curr_user={curr_user}
        addCommentable={handleAddComment} 
      />
    );

    // const showCommentCount = (
    //   <div> Show Comments: {commentsList.length} </div>
    // )

    return (
      <div className={classes.root}>
        <ExpansionPanel className={classes.expansion} >
            
          <ExpansionPanelSummary expandIcon={
            <ExpandMoreIcon onClick={handleGetComments} />
          }>
            <Typography className={classes.heading} >
                See Responses... {commentsList.count}
            </Typography>

          </ExpansionPanelSummary>

          <ExpansionPanelDetails className={classes.expansion} >
            <div className={classes.list} > { commentsList } </div>
          </ExpansionPanelDetails>

        </ExpansionPanel>
        
      </div>
    );
  }
}

CommentsPage.propTypes = propTypes;
CommentsPage.defaultProps = defaultProps;

const styles = theme => ({
  
  root: {
    textAlign:'left',
    // maxWidth: 400,
  },

  expansion: {
    background: 'lime',
    padding: 0,
  },

  heading: {
    // fontSize: theme.typography.pxToRem(12),
    fontWeight: theme.typography.fontWeightRegular,
  },

  list: {
    // for design and debugging
    background: 'aliceblue',
    outline: '1px solid orangered',
    padding: 'none',
    margin:'none',
  }
});

export default withStyles(styles)(CommentsPage);
