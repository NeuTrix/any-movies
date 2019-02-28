// form returns an author, body, and title for a commentable object
// create action (addComment) is dellivered through props
// allows movie or comments to share the component
import React, { Component } from 'react';
import PropTypes from 'prop-types';
// material ui
import { withStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Input from '@material-ui/core/Input';
import { Button } from '@material-ui/core';

const propTypes = {
	classes: PropTypes.instanceOf(Object).isRequired, // material UI
	commentable: PropTypes.instanceOf(Object).isRequired, // The subject
	user: PropTypes.instanceOf(Object).isRequired, // the current user
	// editMode: PropTypes.bool, // new or edit form
	addComment: PropTypes.func.isRequired, // adds a new review instance to api
};

const defaultProps = {
	// editMode: false,
};

class CommentableForm extends Component {

	constructor(props) {
		super(props);
		this.state = {
			// from props
			commentable_id: '',
			commentable_type: '',
			user_id: '',
			author: '',
			// from form
			body: '',
			title: '',
		};
		this.onChange = this.onChange.bind(this);
		this.onClick = this.onClick.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}

	// update the state with form entries
	onChange(e) {
		this.setState({
			[e.target.name]: e.target.value,
		});
	}

	onClick(e) {
		// e.preventDefault();
		const { commentable, user } = this.props;
		// add the type and ids to the state object
		this.setState({
			commentable_id: commentable.id,
			commentable_type: commentable.type ? 'Comment' : 'Movie',
			user_id: user.id,
		});
	}

	onSubmit(e) {
		e.preventDefault();
		const data = this.state;
		console.log('submitting', this.props);
		// #addComment accepts comments as an object
		this.props.addComment(data);
		// setTimeout(() => { this.props.toggleForm(); }, 250)
	}

	render() {
		const { classes, user } = this.props;
		return (
			<FormControl
				className={classes.main}
				component="form"
				onSubmit={this.onSubmit}
				onClick={this.onClick}
			>

				<Input
					fullWidth
					label ="enter your name"
					margin="dense"
					name="author"
					readOnly
					type="text"
					value={user.username}
					variant="outlined"
					onChange={this.onChange}
				/>

				<TextField
					autoFocus
					fullWidth
					label ="enter comment Title"
					margin="dense"
					name="title"
					required
					type="text"
					variant="outlined"
					value={this.state.title}
					onChange={this.onChange}
				/>

				<TextField
					fullWidth
					label ="enter your comment"
					margin="dense"
					multiline
					name="body"
					required
					rows="4"
					type="text"
					value={this.state.body}
					variant="outlined"
					onChange={this.onChange}
				/>

				<Button
					className={classes.button}
					color="primary"
					component="button"
					type="submit"
					variant="contained"
				>
					Submit
				</Button>

			</FormControl>
		);
	}
}

// add grid to update form layout
const styles = theme => ({
	button: {
		width: 100,
	},

	main: {
		display: 'grid',
	}, // place holder for styling
});

CommentableForm.propTypes = propTypes;
CommentableForm.defaultProps = defaultProps;

export default withStyles(styles)(CommentableForm);
