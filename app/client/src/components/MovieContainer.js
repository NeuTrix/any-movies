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

        <h1 style = {{ background: 'aliceblue', gridArea: 'title'}} > 
          Movie Blog! 
        </h1>

        <MovieSearchBar 
          style={{ gridArea: 'search' }}
          getMovieData={this.getMovieData} 
        />
        
        {/* hide for debugging */}
        < div style={{ gridArea: 'movies' }} >
          <MovieDisplay movie={movie} posterUrl={movie.Poster}/>
        </div>
        
        < div style={{ gridArea: 'comments' }} >
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
      "comments"
      "search"
      "movies"
    `,
    padding: theme.spacing.unit,
  },

})

MovieContainer.propTypes = propTypes;

export default withStyles(styles)(MovieContainer)
