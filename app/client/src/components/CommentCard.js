import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import CommentContainer from './CommentableContainer';

const propTypes = {
  classes: PropTypes.instanceOf(Object).isRequired,
  comment: PropTypes.instanceOf(Object).isRequired,
}

function CommentCard(props) {
  const { classes, comment } = props;
  const bull = <span className={classes.bullet}>•</span>;

  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography variant="subtitle" component="h2">
          { comment.title}
        </Typography>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          by: { comment.author }
        </Typography>
        <Typography variant="body1" component="p">
          { comment.body }
        </Typography>
      </CardContent>
      <div className={classes.actions} >
        <div>
           <CardActions>
          <Button size="small">see comments</Button>
        </CardActions>
        </div>
        <div>
           <CardActions className={classes.btnRight} >
          <Button size="small">reply</Button>
        </CardActions>
        </div>
      </div>
      
    </Card>
  );
}

const styles = theme => ({
  actions: {
    display: 'inline-flex',
  },

  card: {
    // gridTemplateAreas
    minWidth: 275,
    marginBottom: theme.spacing.unit,
  },
  pos: {
    marginBottom: 12,
  },
});

CommentCard.propTypes = propTypes;

export default withStyles(styles)(CommentCard);
