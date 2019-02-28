import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
	Badge,
	ExpansionPanel,
	ExpansionPanelDetails,
	ExpansionPanelSummary,
	Typography,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { withStyles } from '@material-ui/core/styles';
import { CommentCardContainer, } from '.';
import { ADD_COMMENTS_TO_DICTIONARY, } from '../helpers/constants';

const propTypes = {
	classes: PropTypes.instanceOf(Object).isRequired, // material UI
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

	updateComments(comments) {
		const cards = comments.map(item => (
			<CommentCardContainer key={item.id} comment={item} />
		));
		this.setState({ deck: cards });
	}

	render() {
		const { classes, comments, title } = this.props;
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
								max={9}
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
	expansion: { background: 'aliceblue', padding: 0 },
	heading: { fontWeight: theme.typography.fontWeightRegular },
	list: { margin: 'none', padding: 'none', width: '100%' },
	root: { textAlign: 'left' },
	summary: { background: theme.palette.secondary.main },
});

CommentsBar.propTypes = propTypes;
CommentsBar.defaultProps = defaultProps;

export default withStyles(styles)(CommentsBar);
