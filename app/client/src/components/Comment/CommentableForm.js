// form returns an author, body, and title for a commentable object
// create action (addCommentable) is dellivered through props
// allows movie or comments to share the component
import React, { Component } from 'react';
import PropTypes from 'prop-types';
// material ui
import { withStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import { Button } from '@material-ui/core';

const propTypes = {
	classes: PropTypes.instanceOf(Object).isRequired, // material UI
	curr_user: PropTypes.instanceOf(Object).isRequired, // from session. Mocked
	commentable: PropTypes.instanceOf(Object).isRequired, // movie or comment obj
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
		this.onSubmit = this.onSubmit.bind(this)
		this.onChange = this.onChange.bind(this)
	}
	componentDidMount() {
		this.setState({ 
			// prefill the form with the current user's name
			author: this.props.author, 
			commentable_id: this.props.commentable_id,
			commentable_type: this.props.commentable_type,
			user_id: this.props.curr_user.id,
		});
	}
  // update the state with form entries
  onChange(e) {
    this.setState({[e.target.name]: e.target.value})
  }
	// post the review to the rails API
  onSubmit(e) {
		e.preventDefault();
		
    this.props.addCommentable(this.state)
  }

	render() {
		const { classes } = this.props;

		return (
			<FormControl
				className={classes.main}
				component="form"
				onSubmit={this.onSubmit}
			>
				<TextField
					name="author"
					label = "enter your name"
					fullWidth
					margin="dense"
					onChange={this.onChange}
					type="text"
					value={this.state.author}
					variant="outlined"
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

        <Button component="button" type="submit" > Submit </Button>

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
