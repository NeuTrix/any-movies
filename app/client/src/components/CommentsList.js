import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import CommentCard from './CommentCard';

const propTypes = {
  classes: PropTypes.instanceOf(Object).isRequired,
  comments: PropTypes.instanceOf(Array).isRequired,
}

function CommentsList(props) {
  const { classes, comments } = props;

   const commentsList = comments.map(com => {
      return ( 
        <div key={com.id}> 
          <CommentCard comment={com} /> 
        </div>
      ) 
    })
      
  return (
    <div className={classes.root}>
      <ExpansionPanel>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Typography className={classes.heading}>
            See Comments: {comments.length} 
          </Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <div className={classes.list} >
           { commentsList }
          </div>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </div>
  );
}

CommentsList.propTypes = propTypes;

const styles = theme => ({
  
  root: {
    textAlign:'left',
    padding: 5,
    maxWidth: 400,
  },
  heading: {
    // fontSize: theme.typography.pxToRem(12),
    fontWeight: theme.typography.fontWeightRegular,
  },

  list: {
    // debugging
    background: 'yellow',
    outline: '1px solid orangered',
  }
});

export default withStyles(styles)(CommentsList);
