import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { withStyles } from '@material-ui/core/styles';


// include props declartaions (classes)
const propTypes = {
  classe: PropTypes.instanceOf(Object).isRequired,
}

class MovieContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      apiKey: process.env.REACT_APP_OMBD_MOVIE_API_KEY,
      movie: { 
        Title: "Placeholder",
        imdbID: 'tt0078748',
      },
    }
    this.getMovieData = this.getMovieData.bind(this);
  }

  componentDidMount() {
    const { movie } = this.state;
    // should work from OMDB api vs my api
    // axios.get(`api/movies/${movie.id}`)
    //   .then(resp => {
    //     console.log(resp);
    //     this.setState({
    //       movie: resp.data
    //     });
    //   })
    //   .catch(err => console.log(err))
  }

  getMovieData() {
    const { apiKey, movie } = this.state;


    axios.get(`http://www.omdbapi.com/?apikey=${apiKey}&i=${movie.imdbID}`)
      .then(resp => {
        console.log(resp);
        this.setState({ movie: resp.data});
      })
      .catch(err => {
        console.log(err)
      })

  }



  render() {
    const { classes } = this.props
    const { movie } = this.state

    return(
      <div className={classes.main} >
        <div style={{gridArea: 'mTitle'}} >
          { movie.Title }
        </div> 
        <div style={{gridArea: 'mYear'}} >
          <button onClick={this.getMovieData} > test </button>
        </div> 
        <div style={{gridArea: 'mPoster'}} >p</div> 
        <div style={{gridArea: 'mDescr'}} >
        
        </div> 
        <div style={{gridArea: 'mLetter'}} >l</div> 
        <div style={{gridArea: 'cRating'}} >r</div> 
      </div>
    )
  }
}

const styles = {
  main: {
    display: 'inline-grid',
    gridTemplateAreas: `
      "mTitle mYear"
      "mPoster mDescr"
      "mLetter cRating"
    `,
    gridTemplateColumns: ' 2fr 3fr',
  },

}

export default withStyles(styles)(MovieContainer)
