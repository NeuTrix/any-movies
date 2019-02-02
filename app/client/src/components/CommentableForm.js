// form returns an author, body, and title for a commentable object
// create action (submitAction) is dellivered through props
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
	commentable_id: PropTypes.string.isRequired, 
	commentable_type: PropTypes.string.isRequired, 
	curr_user: PropTypes.instanceOf(Object).isRequired, // material UI
	// functions
	editMode: PropTypes.bool, // new or edit form 
	submitAction: PropTypes.func.isRequired, // create or edit commentable
	toggleForm: PropTypes.func.isRequired, // create or edit commentable
};

const defaultProps = {
	editMode: false,
}

class CommentableForm extends Component {

	constructor(props) {
		super(props)
		this.state = {
			// from props
			commentable_id: '',
			commentable_type: '',
			user_id: '',
			author: '',
			// from form
      body: '',
      title: '',
		}
		this.onChange = this.onChange.bind(this)
		this.onSubmit = this.onSubmit.bind(this)
	}

	// post the review to the rails API
	componentDidMount() {
		this.setState((state, props) => {
			const { commentable, commentable_id, commentable_type, curr_user, editMode } = props
			let author = curr_user.username;
			let user_id = curr_user.id;
			// prepopulate if this is an editing item
			let body, title
			if (editMode) {
				body = commentable.body 
				title = commentable.title
			}
			return { ...state, author, body, title, user_id, commentable_id, commentable_type }
		});
	}
	
	// update the state with form entries
	onChange(e) {
		this.setState({
			[e.target.name]: e.target.value
		})
	}

  onSubmit(e) {
		e.preventDefault();
		console.log('submitting', this.props)
		this.props.submitAction(this.state);
		setTimeout(() => {
			this.props.toggleForm();
		}, 750)
  }

	render() {
		const { classes, commentable_type, curr_user } = this.props;

		return (
			<FormControl
				className={classes.main}
				component="form"
				onSubmit={this.onSubmit}
			>
				<Input
					name="author"
					label = "enter your name"
					fullWidth
					margin="dense"
					onChange={this.onChange}
					type="text"
					value={curr_user.username}
					variant="outlined"
					readOnly
				/>

				<TextField
					name="title"
					label = "enter title"
					fullWidth
					margin="dense"
					onChange={this.onChange}
					type="text"
					value={this.state.title}
					variant="outlined"
				/>

        <TextField
					name="body"
					label = "enter your review"
					fullWidth
					margin="dense"
					onChange={this.onChange}
					type="text"
					value={this.state.body}
					variant="outlined"
				/>
				
				<Button 
					className={classes.button}
					component="button" 
					type="submit" 
					variant="contained"
					color="primary"
				> 
					Submit  
				</Button>

			</FormControl>
		)
  }
}

// add grid to update form layout
const styles= theme => ({
	button: {
		width: 100,
	},

	main: { 
		display: 'grid'
	}, // place holder for styling
});

CommentableForm.propTypes = propTypes;
CommentableForm.defaultProps = defaultProps;

export default withStyles(styles)(CommentableForm)
