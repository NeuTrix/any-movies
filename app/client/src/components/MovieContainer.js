import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CommentableContainer from './CommentableContainer';
import MovieDisplay from './MovieDisplay';
import axios from 'axios';

// include props declartaions (classes)

const propTypes = {
  classes: PropTypes.instanceOf(Object).isRequired,
  // acquire through movie Api and pass down
  movie: PropTypes.instanceOf(Object).isRequired,
}

class MovieReveiwPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      apiKey: process.env.REACT_APP_OMBD_MOVIE_API_KEY,
      movie: {
        Title: "Placeholder",
        imdbID: 'tt0078748',
      },
      poster: {},
    }
    this.getMovieData = this.getMovieData.bind(this);
    this.searchMovie = this.searchMovie.bind(this)
  }

  // check to see if a movie is in our database
  isMovieSaved(id) {
    // axios.get(`/api/movies/${id}`)
    this.setState({ inDatabase: true });
  }

  // find a movie to review
  searchMovie() {
    //  search the api
    // set the imdb id for state from the search item
    this.setState({imdbId: 'tt0078748'})
    // this.setState({movie.id: 'tt0078748'})
  }

  getMovieData() {
    const {
      apiKey,
      movie
    } = this.state;

    // get the movie data
    axios.get(`http://www.omdbapi.com/?apikey=${apiKey}&i=${movie.imdbID}`)
      .then(resp => {
        console.log(resp);
        this.setState({
          movie: resp.data,
          posterUrl: `http://img.omdbapi.com/?apikey=${apiKey}&i=${movie.imdbID}`
        });
      })
      .catch(err => {
        console.log(err)
      })

    // get the movie poster
    // axios.get(`http://img.omdbapi.com/?apikey=${apiKey}&i=${movie.imdbID}`)
    //   .then(resp => {
    //     console.log(resp);
    //     this.setState({
    //       poster: resp.data
    //     });
    //   })
    //   .catch(err => {
    //     console.log(err)
    //   })

  }

  render() {
    const { classes } = this.props
    const { movie, posterUrl } = this.state
    return (
      <div className={classes.grid}>
        <h1 className={classes.title}>
         Movie Review Page
        </h1>
        <div className={classes.search} >
          <button onClick={this.searchMovie}>
            Search
          </button>
          <button onClick={this.getMovieData} > Get Movie </button>
          
        </div>
        <div className={classes.comments}>
          <CommentableContainer 
            commentableId={movie.id}
            commentableType='Movie'
          />
        </div>
        <div className={classes.movies}>
          <MovieDisplay movie={movie} posterUrl={posterUrl}/>
        </div>
      </div>
    )
  }
}

const styles = {
  grid: {
    display: 'inline-grid',
    gridTemplateAreas: `
      "title title"
      "search comments"
      "movies comments "
    `,
    gridTemplateColumns: '5fr 5fr',
    gridTemplateRows: '2fr 1fr 7fr',
    padding: 5,
    margin: 10,
  },

  comments: {
    background: 'orangered',
    gridArea: 'comments',
  },

  movies: {
    display: 'grid',
    background: 'lime',
    gridArea: 'movies',
  },

  search:{
    background: 'violet',
    gridArea: 'search',
    // minHeight: 50,
  }
}


export default withStyles(styles)(MovieReveiwPage)