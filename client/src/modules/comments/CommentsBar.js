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
import {
	CommentCardContainer,
	CommentableFormContainer, // for adding new comments
} from '.';

const propTypes = {
	classes: PropTypes.instanceOf(Object).isRequired, // material UI
	commentableID: PropTypes.string.isRequired, // from commentable
	commentableType: PropTypes.string.isRequired, // from commentable
	comments: PropTypes.instanceOf(Array).isRequired, // from commentable
	title: PropTypes.string, // title of the comment (Movie)
};

const defaultProps = {
	title: 'this comment', // default for non movie comments
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
		if (comments) { this.updateComments(comments) }
	}

	componentDidUpdate(prevProps) {
		const { comments } = this.props;
		if (comments && prevProps !== this.props) {
			this.updateComments(comments);
		}
	}

	handleClick(e) {
		e.preventDefault();
		this.toggleForm();
	}

	toggleForm() {
		const { showForm } = this.state;
		this.setState({ showForm: !showForm });
	}

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
			title
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

					<Button 
						color="primary"
						variant="outlined" 
						onClick={this.handleClick}
					>
						{ !showForm ? 'Add a Comment' : 'Hide Comment Form' }
					</Button>

					<ExpansionPanelSummary
						className={classes.summary}
						expandIcon={<ExpandMoreIcon />}
					>
						<Typography variant="body2" className={classes.heading}>
							<Badge
								className={classes.badge}
								badgeContent={count}
								color="primary"
								max={9}
							>
								<span />
							</Badge>
							{ message() }
						</Typography>
					</ExpansionPanelSummary>
					
					<ExpansionPanelDetails>
						{ showForm && (
							<CommentableFormContainer
								commentableID={commentableID}
								commentableType={commentableType}
							/>
						)}

					</ExpansionPanelDetails>

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
	expansion: { background: 'aliceblue', padding: 0 },
	heading: { fontWeight: theme.typography.fontWeightRegular },
	list: { margin: 'none', padding: 'none', width: '100%' },
	root: { textAlign: 'left' },
	summary: { background: theme.palette.secondary.main },
});

CommentsBar.propTypes = propTypes;
CommentsBar.defaultProps = defaultProps;

export default withStyles(styles)(CommentsBar);
