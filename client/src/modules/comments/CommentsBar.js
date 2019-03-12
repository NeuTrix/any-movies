import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
	Badge,
	Button,
	ExpansionPanel,
	ExpansionPanelDetails,
	ExpansionPanelSummary,
	Typography,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { withStyles } from '@material-ui/core/styles';
import { CommentCardContainer } from '.';

const propTypes = {
	classes: PropTypes.instanceOf(Object).isRequired, // material UI
	commentableID: PropTypes.string.isRequired, // from commentable
	commentableType: PropTypes.string.isRequired, // from commentable
	comments: PropTypes.instanceOf(Array).isRequired, // from commentable
	registered: PropTypes.bool.isRequired, // from props
	title: PropTypes.string.isRequired, // title of the comment (Movie)
	// functions
	getComments: PropTypes.instanceOf(Function).isRequired,
	isMovieRegistered: PropTypes.instanceOf(Function).isRequired,
	registerMovie: PropTypes.instanceOf(Function).isRequired,
};

const defaultProps = {
	title: 'this comment', // default for non movie comments
	comments: [],
};

class CommentsBar extends Component {
	constructor(props) {
		super(props);
		this.state = {
			deck: [],
			showForm: false,
		};
		this.handleClick = this.handleClick.bind(this);
		this.toggleForm = this.toggleForm.bind(this);
	}

	componentDidMount() {
		const { comments } = this.props;
		if (comments) { this.updateComments(comments)}
	}

	componentDidUpdate(prevProps) {
		const { comments } = this.props;
		if (prevProps.comments !== comments) {
			this.updateComments(comments);
		}
	}

	handleClick(e) {
		e.preventDefault();
		const {
			 commentableID,
			 commentableType,
			 isMovieRegistered,
			 registered,
			 registerMovie,
			 title,
		} = this.props;

		this.toggleForm();

		if (commentableType === 'Movie' && !registered) {
			const data = { imdb_id: commentableID, title };
			const update = new Promise(resolve => resolve(registerMovie(data)))
				.then(() => isMovieRegistered(commentableID));
		}
	}

	toggleForm() {
		const { showForm } = this.state;
		this.setState({ showForm: !showForm });
	}

	// create a comment card component for each comment element
	updateComments(comments) {
		const cards = comments.map(item => (
			<CommentCardContainer key={item.id} comment={item} />
		));
		this.setState({ deck: cards });
	}

	render() {
		const {
			classes,
			comments,
			commentableID,
			commentableType,
			registered,
			title,
		} = this.props;

		const { deck, showForm } = this.state;
		const count = comments.length;
		const message = () => {
			// guard clause and base case for CommentsBar recursion
			if (count === 0) return 'Be the first to review or reply!';

			return count === 1
				? `There is ${count} review for ${title}`
				: `There are ${count} reviews for ${title}`;
		};

		return (
			<div className={classes.root}>
				<ExpansionPanel className={classes.expansion}>
					<ExpansionPanelSummary
						className={classes.summary}
						expandIcon={<ExpandMoreIcon />}
					>
						<Typography variant="body2" className={classes.heading}>
							<Badge
								className={classes.badge}
								badgeContent={count}
								color="primary"
								max={25}
							>
								<span />
							</Badge>
							{ message() }
						</Typography>
					</ExpansionPanelSummary>

					<ExpansionPanelDetails className={classes.expansion}>
						<div className={classes.list}>{ deck }</div>
					</ExpansionPanelDetails>
				</ExpansionPanel>
			</div>
		);
	}
}

const styles = theme => ({
	badge: { marginRight: theme.spacing.unit * 2 },
	button:{ marginTop: 10},
	expansion: { background: 'aliceblue', padding: 0 },
	heading: { fontWeight: theme.typography.fontWeightRegular },
	list: { margin: 'none', padding: 'none', width: '100%' },
	root: { textAlign: 'left' },
	summary: { background: theme.palette.secondary.main },
});

CommentsBar.propTypes = propTypes;
CommentsBar.defaultProps = defaultProps;

export default withStyles(styles)(CommentsBar);
