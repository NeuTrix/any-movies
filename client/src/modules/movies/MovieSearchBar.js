import React, { Component } from 'react';
import PropTypes from 'prop-types';
// material ui
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';

const propTypes = {
	classes: PropTypes.instanceOf(Object).isRequired,
	getMovieData: PropTypes.instanceOf(Function).isRequired,
};

class MovieSearchBar extends Component {

	constructor(props) {
		super(props);
		this.state = {
			searchTerm: '',
		};
		this.onSubmit = this.onSubmit.bind(this);
		this.onChange = this.onChange.bind(this);
	}

	onChange(e) {
		this.setState({ [e.target.name]: e.target.value });
	}

	onSubmit(e) {
		const { getMovieData } = this.props;
		const { searchTerm } = this.state;
		e.preventDefault();
		console.log(e);
		getMovieData(searchTerm);
	}

	render() {
		const { classes } = this.props;
		const { searchTerm } = this.state;

		return (
			<FormControl
				className={classes.main}
				component="form"
				onSubmit={this.onSubmit}
			>
				<TextField
					label="enter movie title"
					fullWidth
					margin="dense"
					name="searchTerm"
					type="text"
					variant="outlined"
					value={searchTerm}
					onChange={this.onChange}
				/>

			</FormControl>
		);
	}
}

const styles = {
	main: { },
};

MovieSearchBar.propTypes = propTypes;

export default withStyles(styles)(MovieSearchBar);
