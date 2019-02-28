//  Should abstract out view from logic for Cards
import React from 'react';
import PropTypes from 'prop-types';
// material UI components
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CommentsBar from './CommentsBar';

const propTypes = {
	classes: PropTypes.instanceOf(Object).isRequired, // material UI
	comment: PropTypes.instanceOf(Object).isRequired, // raw comments from api
};

function CommentCard(props) {
	const { classes, comment } = props;

	return (
		<Card className={classes.grid}>
			<div className={classes.title}>
				<h3>{comment.title}</h3>
			</div>
			<div className={classes.body}>
				<p>{comment.body}</p>
			</div>
			<div className={classes.author}>
				{comment.author}
			</div>
			<div className={classes.actions}>
			</div>
			<div className={classes.replies}>
				<CommentsBar
					comments={comment.sub_comments}
				/>
			</div>
		</Card>
	);
}

const styles = theme => ({
	actions: {
		display: 'inherit',
		gridArea: 'actions',
	},
	body: { gridArea: 'body' },
	form: {
		gridArea: 'form',
		marginTop: theme.spacing.unit * 10,
	},
	grid: {
		border: '2px solid lime',
		display: 'grid',
		gridTemplateAreas: `
      "title title"
      "author author"
			"body body"
			"actions actions"
      "replies replies"
    `,
		marginBottom: theme.spacing.unit * 2,
		padding: theme.spacing.unit,
	},
	replies: { gridArea: 'replies' },
	title: { gridArea: 'title' },
});

CommentCard.propTypes = propTypes;

export default withStyles(styles)(CommentCard);
