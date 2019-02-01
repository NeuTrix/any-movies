// container to gather movie logic
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import CommentableForm from './CommentableForm';
import CommentableContainer from './CommentableContainer';
import MovieDisplay from './MovieDisplay';
import MovieSearchBar from './MovieSearchBar';

const propTypes = {
  classes: PropTypes.instanceOf(Object).isRequired, // material UI
  comments: PropTypes.instanceOf(Object).isRequired, // OMBD api object
  curr_movie: PropTypes.instanceOf(Object).isRequired, // OMBD api object
  curr_user: PropTypes.instanceOf(Object).isRequired, // mocked
  // ===> functions
  addComment: PropTypes.func.isRequired, // adds a new review instance to api
  // getComments: PropTypes.func.isRequired, // adds a new review instance to api
  getMovieData: PropTypes.func.isRequired, // search for curr_movie
}

class MoviePage extends Component {

  constructor(props) {
    super(props)
    this.state = {
      displayingCommentForm: false,
    }

    this.toggleCommentableForm = this.toggleCommentableForm.bind(this);
  }

// allows the addComment form to toggle on and off
  toggleCommentableForm() {
    this.setState({ displayingCommentForm: !this.state.displayingCommentForm });
  }

  render() {  
    // deconstruct prop objects
    const { classes, comments, curr_movie, curr_user } = this.props 
    // deconstruct prop functions
    const { addComment, getMovieData, } = this.props 
    const { displayingCommentForm } = this.state;
    
    // generate commentable form for current movie
    const commentableForm = (
      <CommentableForm 
        commentable_id={curr_movie.imdbID}
        commentable_type={"Movie"}
        curr_user={curr_user}
        submitAction={addComment} 
        toggleForm={this.toggleCommentableForm}
      /> 
    )

    return (
      <div className={classes.grid}>

        <h1 style={{ background: 'aliceblue', gridArea: 'title'}} > 
          Movie Blog! 
        </h1>
      
        <div className={classes.actions} style={{ gridArea: 'addComment' }}>
          <Button 
            variant="outline" 
            onClick={this.toggleCommentableForm}
          >
            Comment
          </Button>
        </div>

        <div 
          className={classes.actions} 
          style={{ gridArea: 'search' }}
        >
          <MovieSearchBar getMovieData={getMovieData} /> 
        </div>

        <div style={{ gridArea: 'form' }}>
          { displayingCommentForm &&  commentableForm } 
        </div>
        
        <div style={{ gridArea: 'movies' }} >
          <MovieDisplay curr_movie={curr_movie} posterUrl={curr_movie.Poster}/>
        </div>
        
        <div className={classes.comments} >
          <CommentableContainer 
            commentable={curr_movie}
            comments={comments}
            commentable_id={curr_movie.imdbID}
            commentable_type={"Movie"}
            curr_user={curr_user}
          />
        </div>
      </div>
    )
  }
}

const styles = theme => ({
  grid: {
    display: 'grid',
    gridTemplateAreas: `
      "title title title "
      "form form form"
      "search search addComment"
      "comments comments comments"
      "movies movies movies"
    `,
    gridTemplateColumns: '1fr 1fr 1fr',
    padding: theme.spacing.unit,
  },

  actions: {
    display: 'grid',
    padding: theme.spacing.unit,
  },

  comments: {
    gridArea: 'comments'
  },
})

MoviePage.propTypes = propTypes;

export default withStyles(styles)(MoviePage)
