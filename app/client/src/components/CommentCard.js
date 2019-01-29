import React, { Component } from 'react';
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

class CommentCard extends Component {

  constructor(props) {
    super(props)
    this.state ={
      display: false
    }
  }

  render() {  
    const { classes, comment } = this.props;

    let Test = ( <h3> Hey There </h3> )

    function getSubComments() {
      return Test = ( < h3 > Changed! < /h3> )
    }

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

          { Test }
        </CardContent>

        <div className={classes.actions} >

          <div>
            <CardActions>
              <Button 
                onClick={ () => getSubComments()} 
                size="small" 
              >
                more comments
              </Button>
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
