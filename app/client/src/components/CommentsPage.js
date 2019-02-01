import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

// import CommentableForm from './CommentableForm';
// import { Button } from '@material-ui/core';

const propTypes = {
  classes: PropTypes.instanceOf(Object).isRequired, // material UI
  commentable: PropTypes.instanceOf(Object).isRequired, // material UI
  commentable_id: PropTypes.string.isRequired, 
  commentable_type: PropTypes.string.isRequired, 
  curr_user: PropTypes.instanceOf(Object).isRequired, // mocked
  commentsList: PropTypes.instanceOf(Array), // from commentable
  // functions
  // handleAddComment: PropTypes.func.isRequired, // adds a new comment to the list
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

  componentDidMount() {
    this.props.handleGetComments()
  }

  render() {
    
    const { 
      classes, 
      commentable_type, 
      commentable_id, 
      commentsList, 
      curr_user, 
      // handleAddComment, 
      handleGetComments, 
    } = this.props

    return (
      <div className={classes.root}>
        < ExpansionPanel 
        // expanded 
          className={classes.expansion} >
          <ExpansionPanelSummary 
          className={classes.summary}
            expandIcon={
              <ExpandMoreIcon onClick={handleGetComments} />
            }>
              <Typography variant="subtitle"  className={classes.heading} >
                  See Responses... {commentsList.length}
              </Typography>

          </ExpansionPanelSummary>

          <ExpansionPanelDetails  className={classes.expansion} >
            <div className={classes.list} > { commentsList } </div>
          </ExpansionPanelDetails>

        </ExpansionPanel>
        
      </div>
    );
  }
}

const styles = theme => ({
  
  root: {
    textAlign:'left',
  },

  expansion: {
    background: 'aliceblue',
    // border: '1px solid darkgrey',
    padding: 0,
  },

  heading: {
    // fontSize: theme.typography.pxToRem(12),
    fontWeight: theme.typography.fontWeightRegular,
  },

  list: {
    // for design and debugging
    padding: 'none',
    margin:'none',
  }, 

  summary: {
    background: "lime",
  },
});

CommentsPage.propTypes = propTypes;
CommentsPage.defaultProps = defaultProps;

export default withStyles(styles)(CommentsPage);
