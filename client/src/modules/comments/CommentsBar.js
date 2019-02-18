import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const propTypes = {
	classes: PropTypes.instanceOf(Object).isRequired, // material UI
	// commentable: PropTypes.instanceOf(Object).isRequired, 
	commentsList: PropTypes.instanceOf(Array), // from commentable
	currUser: PropTypes.instanceOf(Object).isRequired, // mocked
	// handleGetComments: PropTypes.func.isRequired, // update comment to the list
};

const CommentsBar = ({classes, commentsList, currUser}) => {

	return (
		<div> {commentsList}</div>
	)

}


const styles = theme => ({

	root: {
		textAlign: 'left',
	},

	expansion: {
		background: 'aliceblue',
		padding: 0,
	},

	heading: {
		fontWeight: theme.typography.fontWeightRegular,
	},

	list: {
		padding: 'none',
		margin: 'none',
	},

	summary: {
		background: theme.palette.secondary.main,
	},
});

CommentsBar.propTypes = propTypes;
// CommentsBar.defaultProps = defaultProps;

export default withStyles(styles)(CommentsBar);
