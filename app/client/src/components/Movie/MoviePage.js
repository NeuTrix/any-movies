// container to gather movie logic
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import CommentableForm from '../Comment/CommentableForm';
import CommentableContainer from '../Comment/CommentableContainer';
import MovieDisplay from './MovieDisplay';
import MovieSearchBar from './MovieSearchBar';

const propTypes = {
  classes: PropTypes.instanceOf(Object).isRequired, // material UI
  all_comments: PropTypes.instanceOf(Object).isRequired, // OMBD api object
  curr_movie: PropTypes.instanceOf(Object).isRequired, // OMBD api object
  curr_user: PropTypes.instanceOf(Object).isRequired, // mocked
  // ===> functions
  addComment: PropTypes.func.isRequired, // adds a new review instance to api
  getComments: PropTypes.func.isRequired, // adds a new review instance to api
  getMovieData: PropTypes.func.isRequired, // search for curr_movie
}

class MoviePage extends Component {

  constructor(props) {
    super(props)
    this.state = {
      filteredComments: [], // comments related to this specific film
      curr_movie: 'default',
      commentable_type: 'default',
      displayingCommentForm: false
    }

    this.toggleCommentableForm = this.toggleCommentableForm.bind(this);
  }

componentDidMount() {
  const { curr_movie } = this.props;
  let commentable_id = curr_movie.imdbID;
  let commentable_type = "Movie";

  this.setState(state => {
    return { ...state, commentable_id, commentable_type }
  })

  // this.props.getComments(commentable_id, commentable_type)
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
    const { commentable_id, commentable_type } = this.props;
    
    const commentableForm = (
      // generate commentable form for current movie
      <CommentableForm 
        addCommentable={addComment} 
        commetnable={curr_movie}
        curr_user={curr_user}
      /> 
    )

    return (
      <div className={classes.grid}>

        <Button 
          variant="contained"
          onClick={() => this.props.getComments(commentable_id, commentable_type)}
        >  
          Get Comments
        </Button>

        <h1 style={{ background: 'aliceblue', gridArea: 'title'}} > 
          Movie Blog! 
        </h1>
      
        <div className={classes.actions} style={{ gridArea: 'addComment' }}>
          <Button 
            variant="contained" 
            color="primary" 
            onClick={this.toggleCommentableForm}
          >
            Add Review
          </Button>
        </div>

        <div style={{ gridArea: 'search' }}>
          <MovieSearchBar getMovieData={getMovieData} /> 
        </div>

        <div style={{ gridArea: 'form' }}>
          { displayingCommentForm &&  commentableForm } 
        </div>
        
        <div style={{ gridArea: 'movies' }} >
          <MovieDisplay curr_movie={curr_movie} posterUrl={curr_movie.Poster}/>
        </div>
        
        <div style={{ gridArea: 'comments' }} >
          <CommentableContainer 
            comments={comments}
            commentable_id={this.state.commentable_id}
            commentable_type={this.state.commentable_type}
            curr_user={curr_user}
          />
        </div>
      </div>
    )
  }
}

const styles = theme => ({
  grid: {
    display: 'inline-grid',
    gridTemplateAreas: `
      "title title "
      "form form"
      "search addComment"
      "comments comments"
      "movies movies"
    `,
    gridTemplateColumns: '1fr 1fr',
    padding: theme.spacing.unit,
  },

  actions: {
    display: 'grid',
    padding: theme.spacing.unit,
  }
})

MoviePage.propTypes = propTypes;

export default withStyles(styles)(MoviePage)
