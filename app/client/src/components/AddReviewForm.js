import React, { Component } from 'react';
import PropTypes from 'prop-types';
// material ui
import { withStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import { Button } from '@material-ui/core';

const propTypes = {
	classes: PropTypes.instanceOf(Object).isRequired,
	commentableID: PropTypes.instanceOf(Object).isRequired,
	commentableType: PropTypes.instanceOf(Object).isRequired,
  userID: PropTypes.string.isRequired, // placeholder until auth/ath
  // == functions
  addReview: PropTypes.instanceOf(Function).isRequired,
};

class AddReview extends Component {

	constructor(props) {
		super(props)
		this.state = {
      // data from this form
      body: '',
      title: '',
      author: '',
      // from these  props
      commentable_type: '',
      commentable_id: '',
      user_id: '',
		}
		this.onSubmit = this.onSubmit.bind(this)
		this.onChange = this.onChange.bind(this)
	}

  // update the state with form entries
  onChange(e) {
    this.setState({[e.target.name]: e.target.value})
  }

  onSubmit(e) {
    e.preventDefault();
    // set state with remaining props
    this.setState({
      commentable_type: this.props.commentableType,
      commentable_id: this.props.commentableID,
      user_id: this.props.userID,
    })
    // pass state to executable fn
    this.props.addReview(this.state)
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
					name="body"
					label = "enter your review"
					fullWidth
					margin="dense"
					onChange={this.onChange}
					type="text"
					value={this.state.body}
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

        <Button component="button" type="submit" > Submit </Button>

			</FormControl>
		)
  }
}

const styles= theme => ({
	main: { }
 });

AddReview.propTypes = propTypes;

export default withStyles(styles)(AddReview)
