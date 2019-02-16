import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const propTypes = {
	classes: PropTypes.instanceOf(Object).isRequired, // material UI
	// commentable: PropTypes.instanceOf(Object).isRequired, 
	currUser: PropTypes.instanceOf(Object).isRequired, // mocked
	commentsList: PropTypes.instanceOf(Array), // from commentable
	handleGetComments: PropTypes.func.isRequired, // update comment to the list
};

// some commentables may not have comments defined
const defaultProps = {
	commentsList: [],
	currUser: { username: 'mickeyMouse' },
};

class CommentsPage extends Component {
	constructor(props) {
		super(props);

		this.state = {

		};
		this.handleChange = this.handleChange.bind(this);
	}

	// to update the sub comments pages and counts
	componentDidMount() {
		this.props.handleGetComments();
	}

	// update the component if new props recieved
	componentDidUpdate(prevProps, prevState) {
		// need better logic=- how to get commentable id?
		if (prevProps.commentsList.length !== this.props.commentsList.length) {
			this.props.handleGetComments();
		}
	}

	handleChange(event, expanded) {
		if (expanded) {
			alert('expanded');
			this.props.handleGetComments();
		} else {
			alert('closed');
		}
	}

	render() {
		const {
			classes,
			commentsList,
			handleGetComments,
		} = this.props;

		return (
			<div className={classes.root}>
				<ExpansionPanel
					className={classes.expansion}
				>

					<ExpansionPanelSummary
						className={classes.summary}
						onClick={handleGetComments}
						expandIcon={<ExpandMoreIcon />}
					>
						<Typography variant="subtitle1" className={classes.heading}>
                See Responses...
							{commentsList.length}
						</Typography>

					</ExpansionPanelSummary>

					<ExpansionPanelDetails
						className={classes.expansion}
					>
						<div className={classes.list}>
							{' '}
							{ commentsList }
							{' '}
						</div>
					</ExpansionPanelDetails>

				</ExpansionPanel>

			</div>
		);
	}
}

const styles = theme => ({

	root: {
		textAlign: 'left',
	},

	expansion: {
		background: 'aliceblue',
		padding: 0,
	},

	heading: {
		fontWeight: theme.typography.fontWeightRegular,
	},

	list: {
		padding: 'none',
		margin: 'none',
	},

	summary: {
		background: theme.palette.secondary.main,
	},
});

CommentsPage.propTypes = propTypes;
CommentsPage.defaultProps = defaultProps;

export default withStyles(styles)(CommentsPage);
