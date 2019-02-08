import React, { Component } from 'react';
import PropTypes from 'prop-types';
// material ui
import AppBar from '@material-ui/core/AppBar';
import FormControl from '@material-ui/core/FormControl';
import IconButton from '@material-ui/core/IconButton';
// import TextField from '@material-ui/core/TextField';
import InputBase from '@material-ui/core/InputBase';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { withStyles } from '@material-ui/core/styles';

const propTypes = {
	classes: PropTypes.instanceOf(Object).isRequired,
	getMovieData: PropTypes.instanceOf(Function).isRequired,
	isFormDisplayed: PropTypes.bool.isRequired,
	toggleCommentableForm: PropTypes.instanceOf(Function).isRequired,
};

class SearchAppBar extends Component {

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
		const { getMovieData, isFormDisplayed, toggleCommentableForm } = this.props;
		const { searchTerm } = this.state;
		e.preventDefault();
		// close the form if open
		if (isFormDisplayed) {
			toggleCommentableForm();
		}

		getMovieData(searchTerm);
	}

	render() {
		const { classes } = this.props;
		const { searchTerm } = this.state;

		return (
			<div className={classes.root}>
				<AppBar position="static">
					<Toolbar>

						<IconButton className={classes.menuButton} color="inherit" aria-label="Open drawer">
							<MenuIcon />
						</IconButton>

						<Typography
							className={classes.title}
							variant="h6"
							color="inherit"
							noWrap
						>
							{'Any Movies!'}
						</Typography>

						<div className={classes.grow} />

						<div className={classes.search}>
							<FormControl
								className={classes.main}
								component="form"
								onSubmit={this.onSubmit}
							>
								<div className={classes.searchIcon}>
									<SearchIcon />
								</div>
								<InputBase
									placeholder="Search…"
									classes={{
										input: classes.inputInput,
										root: classes.inputRoot,
									}}
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
						</div>


					</Toolbar>
				</AppBar>
			</div>
		);
	}
}

const styles = theme => ({
	grow: {
		flexGrow: 1,
	},
	inputInput: {
		paddingBottom: theme.spacing.unit,
		paddingLeft: theme.spacing.unit * 10,
		paddingRight: theme.spacing.unit,
		paddingTop: theme.spacing.unit,
		transition: theme.transitions.create('width'),
		width: '100%',
		[theme.breakpoints.up('sm')]: {
			'&:focus': {
				width: 200,
			},
			width: 120,
		},
	},
	inputRoot: {
		color: 'inherit',
		width: '100%',
	},
	menuButton: {
		marginLeft: -12,
		marginRight: 20,
	},
	root: {
		width: '100%',
	},
	search: {
		'&:hover': {
			backgroundColor: fade(theme.palette.common.white, 0.25),
		},
		backgroundColor: fade(theme.palette.common.white, 0.15),
		borderRadius: theme.shape.borderRadius,
		marginLeft: 0,
		position: 'relative',
		width: '100%',
		[theme.breakpoints.up('sm')]: {
			marginLeft: theme.spacing.unit,
			width: 'auto',
		},
	},
	searchIcon: {
		alignItems: 'center',
		display: 'flex',
		height: '100%',
		justifyContent: 'center',
		pointerEvents: 'none',
		position: 'absolute',
		width: theme.spacing.unit * 9,
	},

	title: {
		display: 'none',
		[theme.breakpoints.up('sm')]: {
			display: 'block',
		},
	},
});

SearchAppBar.propTypes = propTypes;

export default withStyles(styles)(SearchAppBar);
