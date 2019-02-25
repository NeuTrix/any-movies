import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const propTypes = {
	classes: PropTypes.instanceOf(Object).isRequired, // material UI
	commentableID: PropTypes.string.isRequired,
	commentableType: PropTypes.string.isRequired,
	subComments: PropTypes.instanceOf(Array), // from commentable
};

// const defaultProps = {
// 	subComments:[],
// }

function CommentsBar({classes, subComments, commentableID, commentableType}) {

	return (
		<div className={classes.root}>
			<ExpansionPanel
				className={classes.expansion}
			>
				<ExpansionPanelSummary
					className={classes.summary}
					// onClick={handleGetComments}
					expandIcon={<ExpandMoreIcon />}
				>
					<Typography variant="body2" className={classes.heading}>
						{ `${commentableType} comments: ${subComments.length}` }
					</Typography>

				</ExpansionPanelSummary>

				<ExpansionPanelDetails
					className={classes.expansion}
				>
					<div className={classes.list}>
						{ subComments }
					</div>
				</ExpansionPanelDetails>

			</ExpansionPanel>
		</div>
	);
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

CommentsBar.propTypes = propTypes;
// CommentsBar.defaultProps = defaultProps;

export default withStyles(styles)(CommentsBar);
