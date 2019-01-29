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

function SimpleCard(props) {
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
      <CardActions>
        <Button size="small">see comments</Button>
      </CardActions>
      <CardActions className={classes.btnRight} >
        <Button size="small">reply</Button>
      </CardActions>
    </Card>
  );
}

const styles = {
  card: {
    // gridTemplateAreas
    minWidth: 275,
  },
  pos: {
    marginBottom: 12,
  },
};

SimpleCard.propTypes = propTypes;

export default withStyles(styles)(SimpleCard);