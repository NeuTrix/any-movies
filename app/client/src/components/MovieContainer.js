// container to gather movie logic
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CommentableContainer from './CommentableContainer';
import MovieDisplay from './MovieDisplay';
import axios from 'axios';
import { url_movie_data, url_local_api} from '../helpers/api.helper';
import MovieSearchBar from './MovieSearchBar';

const propTypes = {
  classes: PropTypes.instanceOf(Object).isRequired,
}

class MovieReveiwPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      movie: {},
      comments: {},
    }
    this.getMovieData = this.getMovieData.bind(this);
  }
  
  // set a default movie to display
  componentDidMount(){
    this.getMovieData('alien')
  }

  //  set a controller in API to find the id for this movie
  // search by imdbId
  getComments(imdbId) {
    axios.get(`${url_local_api}\api`)
    // const imdbId = this.state.
  }
  
  // get the movie data
  getMovieData(searchTerm) {
    axios.get(`${url_movie_data}&t=${searchTerm}`)
    .then(resp => {
      console.log(resp);
      const data = resp.data
      // check for an error in the search
        if (data.Error) {
          alert(`Error: ${data.Error} for: \n ==> ${searchTerm} <== \n Please try again`)
        } else {
          // set the movie state with the data
          this.setState({ movie: resp.data });
        }
      })
      // catch errors outside of returned JSON object
      .catch(err => { console.log(err) })
  }

  render() {
    const { classes } = this.props // for material UI
    const { movie } = this.state
    return (
      <div className={classes.grid}>

        <h1 className={classes.title}>
         Movie Blog!
        </h1>
        
        <MovieSearchBar 
          className={classes.search}
          getMovieData={this.getMovieData} 
        >
        </MovieSearchBar>

        <div className={classes.comments}>
          <CommentableContainer 
            commentableId={movie.id}
            commentableType='Movie'
          />
        </div>

        <div className={classes.movies}>
          <MovieDisplay movie={movie} posterUrl={movie.Poster}/>
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

export default withStyles(styles)(MovieReveiwPage)
