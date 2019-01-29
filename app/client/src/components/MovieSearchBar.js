import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';

const propTypes = {
	classes: PropTypes.instanceOf(Object).isRequired,
	getMovieData: PropTypes.instanceOf(Function).isRequired,
};

class MovieSearchBar extends Component {

	constructor(props) {
		super(props)
		this.state = {
			searchTerm:''
		}
		this.onSubmit = this.onSubmit.bind(this)
		this.onChange = this.onChange.bind(this)
	}

onChange(e) {
	this.setState({[e.target.name]: e.target.value})
}

onSubmit(e) {
	const { searchTerm } = this.state;
		e.preventDefault();
		console.log(e)
		this.props.getMovieData(searchTerm)
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
					label = "Search for movie by title"
					fullWidth
					margin="dense"
					name="searchTerm"
					onChange={this.onChange}
					type="text"
					value={this.state.searchTerm}
					variant="outlined"
					required
				/>

			</FormControl>
		)
  }
}

const styles= theme => ({
	main: { }
 });

MovieSearchBar.propTypes = propTypes;

export default withStyles(styles)(MovieSearchBar)
