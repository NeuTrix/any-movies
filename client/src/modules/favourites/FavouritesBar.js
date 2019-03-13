import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

const propTypes = {
	classes: PropTypes.instanceOf(Object).isRequired,
	posters: PropTypes.instanceOf(Array).isRequired,
	title: PropTypes.instanceOf(String).isRequired,
};

const FavouritesBar = ({ classes, posters, title }) => {

	return (
    <div className={classes.root}>
      <div className={classes.posters}>{ posters }</div>
			{ title }
    </div>
	);
};

const styles = theme => ({
	posters: { 
		display: 'inline-flex',
		fontSize: '0.75em',
	},
	root: { overflow: 'auto' },
});


FavouritesBar.propTypes = propTypes;

export default withStyles(styles)(FavouritesBar);
