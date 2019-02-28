import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { CommentCard } from '../comments';


const propTypes = {
	classes: PropTypes.instanceOf(Object).isRequired, // material UI
	// commentable: PropTypes.instanceOf(Object).isRequired, // material UI
	comments: PropTypes.instanceOf(Array).isRequired, // from commentable
	count: PropTypes.number.isRequired, // keep count of comments for display
	title: PropTypes.string, // title of the comment (Movie)
};

const defaultProps = { 
	title: 'this comment', // default for non movie comments
};

function CommentsBar({ classes, comments, count, title }) {

	const cards = comments.map(item => (
		<CommentCard
			key={item.id}
			comment={item}
			subComments={item.sub_comments}
		/>
	));

	return (
		<div className={classes.root}>
			<ExpansionPanel className={classes.expansion}>
				<ExpansionPanelSummary
					className={classes.summary}
					expandIcon={<ExpandMoreIcon />}
				>
					<Typography variant="body2" className={classes.heading}>
						{ `There are ${count} comments for ${title}` }
					</Typography>

				</ExpansionPanelSummary>

				<ExpansionPanelDetails className={classes.expansion}>
					<div className={classes.list}>{ cards }</div>
				</ExpansionPanelDetails>

			</ExpansionPanel>
		</div>
	);
}

const styles = theme => ({
	expansion: {
		background: 'aliceblue',
		padding: 0,
	},

	heading: {
		fontWeight: theme.typography.fontWeightRegular,
	},

	list: {
		margin: 'none',
		padding: 'none',
		width: '100%',
	},

	root: {
		textAlign: 'left',
	},

	summary: {
		background: theme.palette.secondary.main,
	},
});

CommentsBar.propTypes = propTypes;
CommentsBar.defaultProps = defaultProps;

export default withStyles(styles)(CommentsBar);
