// container to gather movie logic
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import axios from 'axios';
import { url_movie_data} from '../helpers/api.helper';
import CommentableContainer from './CommentableContainer';
import MovieDisplay from './MovieDisplay';
import MovieSearchBar from './MovieSearchBar';

const propTypes = {
  classes: PropTypes.instanceOf(Object).isRequired,
}

class MovieContainer extends Component {
  constructor(props) {
    super(props)

    this.state = {
      commentableID: 'Movie default',
      commentableType: 'Movie',
      movie: {},
      movieId: 'Find_a_Movie',
    }
    this.getMovieData = this.getMovieData.bind(this);
  }
  
  componentDidMount(){
    this.getMovieData('Alien')
  }

  // get the movie data
  getMovieData(searchTerm) {

    axios.get(`${url_movie_data}&t=${searchTerm}`)
      .then(resp => {
        const data = resp.data

        if (data.Error) {
          alert(`Error: ${data.Error} for:\n => ${searchTerm} <= \nTry again`)
        } 

        this.setState({ 
          movie: data,
          commentableID: data.imdbID,
        })
      })
      .catch(err => { 
        console.log('===>Error',err) 
      })
  }

  render() {
    const { classes } = this.props // for material UI
    const { movie, commentableID, commentableType } = this.state
    return (
      <div className={classes.grid}>

        <h1 className={classes.title}> Movie Blog! </h1>
        
        <MovieSearchBar 
          className={classes.search}
          getMovieData={this.getMovieData} 
        />

        <div className={classes.movies}>
          <MovieDisplay movie={movie} posterUrl={movie.Poster}/>
        </div>
        
        <div className={classes.comments}>
          <CommentableContainer 
            commentableID={commentableID}
            commentableType={commentableType} 
          />
        </div>
      </div>
    )
  }
}

// move the display logic outside of the containder component
const styles = theme => ({
  grid: {
    display: 'inline-grid',
    gridTemplateAreas: `
      "title"
      "search"
      "movies"
      "comments"
    `,
    padding: theme.spacing.unit,
  },

  comments: {
    background: theme.palette.primary.main,
    gridArea: 'comments',
    marginTop: theme.spacing.unit,
  },

  movies: {
    display: 'grid',
    background: theme.palette.secondary.main,
    gridArea: 'movies',
    marginTop: theme.spacing.unit,
  },

  search:{
    gridArea: 'search',
  },

  title: { 
    background: 'aliceblue',
    gridArea: 'title',
    marginTop: theme.spacing.unit,
  }
})

MovieContainer.propTypes = propTypes;

export default withStyles(styles)(MovieContainer)
