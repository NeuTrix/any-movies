// form returns an author, body, and title for a commentable object
// create action (addCommentable) is dellivered through props
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
	addCommentable: PropTypes.func.isRequired, // create relative commentable
};

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

  // update the state with form entries
  onChange(e) {
    this.setState({[e.target.name]: e.target.value})
	}
	
	// post the review to the rails API
	componentDidMount() {
		this.setState((state, props) => {
			const { commentable_id, commentable_type, curr_user } = props
			let author = curr_user.username;
			let user_id = curr_user.id;
			return { ...state, author, user_id, commentable_id, commentable_type }
		});
	}
	
  onSubmit(e) {
		e.preventDefault();
		this.props.addCommentable(this.state)
  }

	render() {
		const { classes, curr_user } = this.props;

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
				
        <Button component="button" type="submit" > Submit  </Button>

			</FormControl>
		)
  }
}

// add grid to update form layout
const styles= theme => ({
	main: { } // place holder for styling
});

CommentableForm.propTypes = propTypes;

export default withStyles(styles)(CommentableForm)
