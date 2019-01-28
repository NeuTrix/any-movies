import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CommentableContainer from './CommentableContainer';
import MovieDisplay from './MovieDisplay';
import axios from 'axios';
import { url_data, url_poster} from '../helpers/apiHelper';
import MovieSearchBar from './MovieSearchBar';

const propTypes = {
  classes: PropTypes.instanceOf(Object).isRequired,
}

class MovieReveiwPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      movie: {},
      poster: {},
    }
    this.getMovieData = this.getMovieData.bind(this);
  }

  getMovieData(searchTerm) {
    // get the movie data
    axios.get(`${url_data}&t=${searchTerm}`)
    // check for an error in the search
      .then(resp => {
        console.log(resp);
        const data = resp.data
        if (data.Error) {
          alert(`Error: ${data.Error} for: \n ==> ${searchTerm} <== \n Please try again`)
        } else {
          this.setState({
            movie: resp.data,
            posterUrl: `${url_poster}&i=${resp.data.imdbID}`
          });
        }
      })
      .catch(err => {
        console.log(err)
      })
  }

  render() {
    const { classes } = this.props
    const { movie, posterUrl } = this.state
    return (
      <div className={classes.grid}>

        <h1 className={classes.title}>
         Movie Blog Home Page
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
          <MovieDisplay movie={movie} posterUrl={posterUrl}/>
        </div>

      </div>
    )
  }
}

const styles = theme => ({
  grid: {
    display: 'inline-grid',
    gridTemplateAreas: `
      "title"
      "search"
      "movies"
      "comments"
    `,
    // ==> for larger screen
    // gridTemplateAreas: `
    //   "title title"
    //   "search comments"
    //   "movies comments "
    // `,
    // gridTemplateColumns: '5fr 5fr',
    // gridTemplateRows: '2fr 1fr 7fr',

    
    padding: theme.spacing.unit,
    // margin: 10,
  },

  comments: {
    background: theme.palette.primary.main,
    // background: 'orangered',
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