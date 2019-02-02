// container to gather movie logic
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import CommentableForm from '../comments/CommentableForm';
import CommentableContainer from '../comments/CommentableContainer';
import MovieDisplay from './MovieDisplay';
import MovieSearchBar from './MovieSearchBar';
import SearchAppBar from '../tools/SearchAppBar';


const propTypes = {
  classes: PropTypes.instanceOf(Object).isRequired, // material UI
  comments: PropTypes.instanceOf(Object).isRequired, // OMBD api object
  curr_movie: PropTypes.instanceOf(Object).isRequired, // OMBD api object
  curr_user: PropTypes.instanceOf(Object).isRequired, // mocked
  // ===> functions
  addComment: PropTypes.func.isRequired, // adds a new review instance to api
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
    
    // generate comment form for current movie
    const newCommentForm = (
      <CommentableForm 
      // using OMDB obj vs api so need to define commentable_id/type
        commentable_id={curr_movie.imdbID} 
        commentable_type={"Movie"}
        curr_user={curr_user}
        submitAction={addComment} 
        toggleForm={this.toggleCommentableForm}
      />
    )

    return (
      // set style for poset her.  need to access url variable
      <div className={classes.posterBackground}
        style={{ backgroundImage: `url(${curr_movie.Poster})` }}
      >
      {/* fake opacity */}
      <div className={classes.grid}>

          <h1 style={{ background: 'aliceblue', gridArea: 'title'}} > 
            {/* Movie Blog!  */}
            <SearchAppBar getMovieData={getMovieData} />
          </h1>
        
          <div className={classes.actions} style={{ gridArea: 'addComment' }}>
            <Button 
              variant="contained"
              size="small" 
              onClick={this.toggleCommentableForm}
            >
              Comments?
            </Button>
          </div>

          <div 
            className={classes.actions} 
            style={{ gridArea: 'search' }}
          >
            <MovieSearchBar getMovieData={getMovieData} /> 
          </div>

          <div style={{ gridArea: 'form' }}>
            { displayingCommentForm &&  newCommentForm } 
          </div>
          
          <div style={{ gridArea: 'movies' }} >
            <MovieDisplay curr_movie={curr_movie} posterUrl={curr_movie.Poster}/>
          </div>
          
          <div className={classes.comments} >
            <CommentableContainer 
              comments={comments}
              commentable={curr_movie}
              curr_user={curr_user}
            />
          </div>
        </div>
      </div>
    )
  }
}

const styles = theme => ({
  grid: {
    display: 'inline-grid',
    gridTemplateAreas: `
      "title title title "
      "form form form"
      "search search addComment"
      "comments comments comments"
      "movies movies movies"
    `,
    gridTemplateColumns: '1fr 1fr 1fr',
    padding: theme.spacing.unit,
    maxWidth: 600,
    backgroundColor: 'white',
    opacity: '0.93',
  },

  actions: {
    display: 'grid',
    padding: theme.spacing.unit,
  },

  comments: {
    gridArea: 'comments'
  },

  posterBackground: {
    // adjust poster background based on screen size
    [theme.breakpoints.down("sm")] :{
      backgroundRepeat: 'repeat-y',
      backgroundSize: 'cover',
      backgroundAttachment: 'fixed'
    }
  }
})

MoviePage.propTypes = propTypes;

export default withStyles(styles)(MoviePage)
