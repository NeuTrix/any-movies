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
      // comments: {},
    }
    this.getMovieData = this.getMovieData.bind(this);
    // this.getComments = this.getComments.bind(this);
  }
  
  // set a default movie to display
  componentDidMount(){
    this.getMovieData('alien')
  }

  //  set a controller in API to find the id for this movie
  // search by imdbID
  // getComments(movieId) {
  //   // const { movie } = this.state
  //   axios.get(`/api/movies/${movieId}/comments`)
  //   .then(resp => {
  //     console.log(resp);
  //     const data = resp.data;
  //     this.setState({ comments: data });

  //   })
  //   .catch(err => {
  //     console.log(err);
  //   })
  // }
  
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
          // buld the movie object
          this.setState({ movie: data });
          console.log('===> Got the movide data!', data.imdbID)
          console.log('STATE-->',this.state)
          return data
        }
      })
      // build the comments object
      // .then(data => {
      //   this.getComments(data.imdbID);
      //   console.log('====>', this.state)
      //   return data;
      // })
      // catch errors outside of returned JSON object
      .catch(err => {  console.log('===>',err) })
  }

  render() {
    const { classes } = this.props // for material UI
    const { movie } = this.state
    // const { comments, movie } = this.state
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
            // comments={comments}
            commentableId={movie.imdbID}
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
