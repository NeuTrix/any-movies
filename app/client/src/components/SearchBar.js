import React, { Component } from 'react';
import PropTypes from 'prop-types';
// from @material-ui
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import NoteAddIcon from '@material-ui/icons/NoteAdd';
import TextField from '@material-ui/core/TextField';

const MovieText = props => (
	<TextField
		{...props}
		fullWidth
		margin="dense"
		name="task"
		type="text"
		variant="outlined"
	/>
)

function SearchBar() {
  return (
    <MovieText/>
  )
}


export default SearchBar