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
	comment: PropTypes.instanceOf(Object), // placeholder - support editMode logic
	commentableID: PropTypes.string.isRequired, // target id for new comments
	commentableType: PropTypes.string.isRequired, // target type for new comments
	editMode: PropTypes.bool.isRequired, // determine edit (starting) state of the form
	user: PropTypes.instanceOf(Object).isRequired, // the current user
	// editMode: PropTypes.bool, // new or edit form
	addComment: PropTypes.func.isRequired, // adds a new review instance to api
	editComment: PropTypes.func.isRequired, // edits a current comment to api
	toggleForm: PropTypes.instanceOf(Function).isRequired, // use parent toggle fn
};

const defaultProps = {
	comment: {
		body: "",
		title: "",
	},
};

class CommentableForm extends Component {

	constructor(props) {
		super(props);
		this.state = {
		};
		this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}

	componentDidMount() {
		const { comment, commentableID, commentableType, editMode, user } = this.props;
		
		this.setState({
			author: user.username,
			body: comment.body,
			commentable_id: commentableID,
			editMode,
			// Movies from OMDB api don't have an type prop matching this api ...
			commentable_type: commentableType || "Movie",
			// title: comment.title,
			user_id: user.id,
		});
	}
	// update the state with form entries
	onChange(e) {
		this.setState({
			[e.target.name]: e.target.value,
		});
	}

	onSubmit(e) {
		e.preventDefault();
		const data = this.state;
		const { addComment, comment, editComment, editMode, toggleForm } = this.props;
		// use Promises to manage order of async executions
		if (editMode) {
			new Promise(res => res(editComment(comment.id, data)))
				.then(() => console.log('submitting #edit', data))
				.then(() => toggleForm())
				.catch(err => console.log(err));
		} else {
			new Promise(res => res(addComment(data)))
			.then(() => console.log('submitting #add', data))
			.then(() => toggleForm())
			.catch(err => console.log(err));
		}
	}

	render() {
		const { classes, comment, editMode, user } = this.props;
		// const { editMode } = this.state;
		console.log(99, '==>', editMode);
		return (
			<FormControl
				className={classes.main}
				component="form"
				onSubmit={this.onSubmit}
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
					label="enter comment Title"
					margin="dense"
					name="title"
					required
					type="text"
					variant="outlined"
					defaultValue={editMode === 'true' ? comment.title :''}
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
					defaultValue={editMode === 'true' ? comment.body :''}
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
					{ 'Submit' }
				</Button>

			</FormControl>
		);
	}
}

// add grid to update form layout
const styles = () => ({
	button: { width: 100 },
	main: {
		display: 'grid',
	},
});

CommentableForm.propTypes = propTypes;
CommentableForm.defaultProps = defaultProps;

export default withStyles(styles)(CommentableForm);
