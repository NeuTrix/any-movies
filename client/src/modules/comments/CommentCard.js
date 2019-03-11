//  Should abstract out view from logic for Cards
import React, { Component } from 'react';
import PropTypes from 'prop-types';
// material UI components
import {
	Button,
	Card,
	CardActionArea,
	CardActions,
	CardContent,
	Typography,
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import CommentsBarContainer from './CommentsBarContainer';
import { CommentableFormContainer } from '.';

const propTypes = {
	classes: PropTypes.instanceOf(Object).isRequired, // material UI
	comment: PropTypes.instanceOf(Object).isRequired, // raw comments from api
	deleteComment: PropTypes.instanceOf(Function).isRequired,
	subComments: PropTypes.instanceOf(Array).isRequired, // subComments filtered
};

class CommentCard extends Component {

	constructor(props) {
		super(props);
		this.state = {
			showEditForm: false,
			showReplyForm: false,
		};
		this.handleDelete = this.handleDelete.bind(this);
		this.handleEdit = this.handleEdit.bind(this);
		this.handleReply = this.handleReply.bind(this);
		this.toggleEditForm = this.toggleEditForm.bind(this);
		this.toggleReplyForm = this.toggleReplyForm.bind(this);
	}

	handleEdit(e) {
		e.preventDefault();
		this.toggleEditForm();
	};

	handleReply(e) {
		e.preventDefault();
		this.toggleReplyForm();
	};

	handleDelete(e) {
		e.preventDefault();
		const { comment, deleteComment } = this.props;
		window.confirm(`Delete comment: ${comment.id}?`);
		deleteComment(comment.id);
	};

	toggleEditForm() {
		this.setState(prevState => ({
			showEditForm: !prevState.showEditForm,
			showReplyForm: false,
		}));
	};

	toggleReplyForm() {
		this.setState(prevState => ({
			showEditForm: false,
			showReplyForm: !prevState.showReplyForm,
		}));
	};

	render() {
		const { classes, comment, subComments } = this.props;
		const { showEditForm, showReplyForm } = this.state;
		return (
			<Card className={classes.grid}>
				<div className={classes.title}>
					<h3>{comment.title}</h3>
					<p>{comment.id}</p>
					<p>{comment.type}</p>
				</div>
				<div className={classes.body}>
					<p>{comment.body}</p>
				</div>
				<div className={classes.author}>
					{comment.author}
				</div>

				<div className={classes.actions}>
					<CardActions>
						<Button variant="outline" onClick={this.handleReply}>Reply</Button>
						<Button variant="outline" onClick={this.handleEdit}>Edit</Button>
						<Button variant="outline" onClick={this.handleDelete}>Del</Button>
					</CardActions>
				</div>

				<div className={classes.replies}>
					{ showEditForm && 
						<CommentableFormContainer
							comment={comment}
							commentableID={comment.commentableID}
							commentableType={comment.commentableType}
							editMode="true"
							toggleForm={this.toggleEditForm}
						/>
					}

					{ showReplyForm &&
						<CommentableFormContainer
							comment={comment}
							commentableID={comment.commentableID}
							commentableType={comment.commentableType}
							editMode="false"
							toggleForm={this.toggleReplyForm}
						/>
					}

					<CommentsBarContainer
						commentableID={comment.id} // parent info for adding comments
						commentableType="Comment" // parent info for adding comments
						comments={subComments}
					/>
				</div>
			</Card>
		);
	}
}

const styles = theme => ({
	actions: {
		display: 'inherit',
		gridArea: 'actions',
	},
	body: {
		gridArea: 'body',
		width: '100%',
	},
	form: {
		gridArea: 'form',
		marginTop: theme.spacing.unit * 10,
	},
	grid: {
		border: '1px solid lime',
		display: 'grid',
		gridTemplateAreas: `
			"title title"
			"author author"
			"body body"
			"actions actions"
			"replies replies"
		`,
		marginBottom: theme.spacing.unit * 2,
		padding: theme.spacing.unit * 1,
	},
	replies: { gridArea: 'replies' },

	title: {
		gridArea: 'title',
		width: '100%',
	},
});

CommentCard.propTypes = propTypes;

export default withStyles(styles)(CommentCard);
