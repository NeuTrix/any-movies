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
};

const SearchByTitle = props => (
	<TextField
		{...props}
		fullWidth
		margin="dense"
		name="movieTitle"
		type="text"
		variant="outlined"
	/>
)

class MovieSearchBar extends Component {
	constructor(props) {
		super(props)
		this.state = {
			movieTitle: '',
			movieId: ''
		}
		this.onSubmit = this.onSubmit.bind(this)
	}

	onSubmit(e) {
		e.preventDefault();
	}

	render() {
		const { classes } = this.props;

    return (
			<FormControl
				className={classes.grid}
				component="form"
				onSubmit={this.handleSubmit}
			>
				<SearchByTitle
					label="enter movie title"
					style={{ gridArea: 'movieTitle' }}
					reauired
					// value={movieTitle}
					onChange={this.handleChange}
				/>
				<Button
					className={classes.button}
					component="button"
					type="submit"
				>
				</Button>
			</FormControl>
		)
		
  }
}

const styles = theme => ({

})

export default withStyles(styles)(MovieSearchBar)