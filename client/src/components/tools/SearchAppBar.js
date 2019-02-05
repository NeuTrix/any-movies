import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import FormControl from '@material-ui/core/FormControl';
import IconButton from '@material-ui/core/IconButton';
// import TextField from '@material-ui/core/TextField';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { withStyles } from '@material-ui/core/styles';

const propTypes = {
	classes: PropTypes.instanceOf(Object).isRequired,
	getMovieData: PropTypes.instanceOf(Function).isRequired,
	toggleCommentableForm: PropTypes.instanceOf(Function).isRequired,
	isFormDisplayed: PropTypes.instanceOf(Boolean).isRequired,
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
		const { searchTerm } = this.state;
		e.preventDefault();
		console.log(e);
		// close the form if open
		if (this.props.isFormDisplayed) {
			this.props.toggleCommentableForm();
		}
		this.props.getMovieData(searchTerm);
	}

	render() {
		const { classes } = this.props;

		return (
			<div className={classes.root}>
				<AppBar position="static">
					<Toolbar>

						<IconButton className={classes.menuButton} color="inherit" aria-label="Open drawer">
							<MenuIcon />
						</IconButton>

						<Typography className={classes.title} variant="h6" color="inherit" noWrap>
              Any Movies!


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
										root: classes.inputRoot,
										input: classes.inputInput,
									}}
									label="enter movie title"
									fullWidth
									margin="dense"
									name="searchTerm"
									onChange={this.onChange}
									type="text"
									value={this.state.searchTerm}
									variant="outlined"
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
	root: {
		width: '100%',
	},
	grow: {
		flexGrow: 1,
	},
	menuButton: {
		marginLeft: -12,
		marginRight: 20,
	},
	title: {
		display: 'none',
		[theme.breakpoints.up('sm')]: {
			display: 'block',
		},
	},
	search: {
		position: 'relative',
		borderRadius: theme.shape.borderRadius,
		backgroundColor: fade(theme.palette.common.white, 0.15),
		'&:hover': {
			backgroundColor: fade(theme.palette.common.white, 0.25),
		},
		marginLeft: 0,
		width: '100%',
		[theme.breakpoints.up('sm')]: {
			marginLeft: theme.spacing.unit,
			width: 'auto',
		},
	},
	searchIcon: {
		width: theme.spacing.unit * 9,
		height: '100%',
		position: 'absolute',
		pointerEvents: 'none',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	},
	inputRoot: {
		color: 'inherit',
		width: '100%',
	},
	inputInput: {
		paddingTop: theme.spacing.unit,
		paddingRight: theme.spacing.unit,
		paddingBottom: theme.spacing.unit,
		paddingLeft: theme.spacing.unit * 10,
		transition: theme.transitions.create('width'),
		width: '100%',
		[theme.breakpoints.up('sm')]: {
			width: 120,
			'&:focus': {
				width: 200,
			},
		},
	},
});

SearchAppBar.propTypes = propTypes;

export default withStyles(styles)(SearchAppBar);
