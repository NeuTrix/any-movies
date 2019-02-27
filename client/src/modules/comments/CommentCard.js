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
import CommentsPage from './CommentsPage';
// import CommentableContainer from './CommentableContainer';
import CommentableForm from './CommentableForm';/*  */

// should consider spreading props from the parent instead
const propTypes = {
	classes: PropTypes.instanceOf(Object).isRequired, // material UI
	commentable: PropTypes.instanceOf(Object).isRequired, // material UI
	commentable_id: PropTypes.string.isRequired,
	commentable_type: PropTypes.string.isRequired,
	currUser: PropTypes.instanceOf(Object).isRequired, // mocked.Will be from auth
};

function CommentCard(props) {
	const { classes, commentable, commentable_id, commentable_type } = props;
	return(
		<Card className={classes.grid}>
			<div> {commentable.title} </div>
		</Card>
	)
}

const styles = theme => ({
	actions: {
		display: 'inherit',
	},

	grid: {
		display: 'grid',
		gridTemplateAreas: `
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
