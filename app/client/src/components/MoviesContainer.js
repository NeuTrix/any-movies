import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { withStyles } from '@material-ui/core/styles';

// include props declartaions (classes)

class MoviesContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      movies: [],
    }
  }

  componentDidMount() {
    axios.get('api/movies')
      .then(resp => {
        console.log(resp);
        this.setState({
          movies: resp.data
        });
      })
      .catch(err => console.log(err))
  }

  render() {
    const { movies } = this.state

    const moviesList = movies.map(movie => {
      return (
        <li key={movie.id}  >
          {movie.title} 
        </li>
      )
    })
    return(
      <div>
        <ul>
          {moviesList}
        </ul>
      </div>
    )
  }


}

export default MoviesContainer

// class MoviesContainer extends Component {
//   constructor(props) {
//     super(props)
//     this.state = {

//     }
//   }

//   render() {
//     const { classes } = this.props
//     return (
//       <div className={classes.grid}>
//         <h1> Movies Container </h1>
//       </div>
//     )
//   }
// }

// const styles = {
//   grid: {
//     // display: 'grid',
//     padding: 5,
//   }
// }

// export default withStyles(styles)(MoviesContainer)