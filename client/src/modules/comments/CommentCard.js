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
import CommentsBar from './CommentsBar';
// import CommentableContainer from './CommentableContainer';
import CommentableForm from './CommentableForm';/*  */

// should consider spreading props from the parent instead
const propTypes = {
	classes: PropTypes.instanceOf(Object).isRequired, // material UI
	comment: PropTypes.instanceOf(Object).isRequired, // material UI
	subComments: PropTypes.instanceOf(Array).isRequired, // material UI
};

function CommentCard(props) {
	const { classes, comment, subComments } = props;
	return (
		<Card className={classes.grid}>
			<div className={classes.title}>
				<h3>{comment.title}</h3>
			</div>
			<div className={classes.body}>
				<p>{comment.body}</p>
			</div>
			<div className={classes.author}>
				<p>{comment.author}</p>
			</div>
			<div className={classes.replies}>
				{/* <CommentsBar comments={[<li>1</li>,<li>3</li>]} /> */}
			</div>
		</Card>
	);
}

const styles = theme => ({
	actions: { display: 'inherit' },
	body: { gridArea: 'body' },
	form: { gridArea: 'form' },
	grid: {
		border: '2px solid lime',
		display: 'grid',
		gridTemplateAreas: `
      "title title"
      "author author"
      "body body"
      "replies replies"
      "form form"
    `,
		marginBottom: theme.spacing.unit * 2,
		padding: theme.spacing.unit,
	},
	pos: { marginBottom: 12 },
	replies: { gridArea: 'replies' },
	title: { gridArea: 'title' },
});

CommentCard.propTypes = propTypes;

export default withStyles(styles)(CommentCard);
