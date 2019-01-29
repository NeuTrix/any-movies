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

function SimpleExpansionPanel(props) {
  const { classes, comments } = props;

   const commentsList = comments.map(com => {
      return ( 
        <div key={com.id}> <CommentCard comment={com} /> </div>
      ) 
    })
      
  return (
    <div className={classes.root}>
      <ExpansionPanel>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Typography className={classes.heading}>
            Comments: {comments.length} 
          </Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
           { commentsList }
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </div>
  );
}

SimpleExpansionPanel.propTypes = propTypes;

const styles = theme => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
});

export default withStyles(styles)(SimpleExpansionPanel);
