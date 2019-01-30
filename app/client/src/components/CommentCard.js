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
  toggleForm: PropTypes.func.isRequired, // toggles the addComment form in view
}

class CommentCard extends Component {

  constructor(props) {
    super(props)
    this.state ={
      display: false
    }
    this.getSubComments = this.getSubComments.bind(this);
  }

  getSubComments(prevState) {
    // toggle display
    this.setState({ display: !this.state.display  });
  }

  render() {  
    const { classes, comment, toggleForm } = this.props;
    const { display } = this.state;

    let SubComments = ( 
      <CommentContainer
        commentableID={comment.id}
        commentableType="Comment"
      />
    )

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
              <Button 
                onClick={this.getSubComments} 
                size="small" 
              >
                more comments
              </Button>
            </CardActions>
          </div>

          <div>
            <CardActions className={classes.btnRight} >
              <Button size="small" onClick={toggleForm} >reply</Button>
            </CardActions>
          </div>

        </div>
         {/* place holder for subComments */}
        < CardContent>
          { display && SubComments }
        </CardContent>
          
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
