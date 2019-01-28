import React, { Component } from 'react';
import PropTypes from 'prop-types';
// from @material-ui
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import NoteAddIcon from '@material-ui/icons/NoteAdd';
import TextField from '@material-ui/core/TextField';

const propTypes = {
	classes: PropTypes.instanceOf(Object).isRequired,
	handleSubmit: PropTypes.instanceOf(Function).isRequired,
};

// const SearchByTitle = props => (
	
// )

class MovieSearchBar extends Component {
	constructor(props) {
		super(props)
		this.state = {
			// movieTitle: '',
			// movieId: ''
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
		// alert(e.target.value)
		console.log(e)
		// alert(searchTerm)
		// this.props.getMovieData('star wars')
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
					label = "enter title or imdbID ..."
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

const styles = theme => ({
	main: {
	}
})

export default withStyles(styles)(MovieSearchBar)