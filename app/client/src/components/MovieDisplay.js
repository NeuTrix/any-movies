import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography'


// include props declartaions (classes)
const propTypes = {
  classes: PropTypes.instanceOf(Object).isRequired,
  movie: PropTypes.instanceOf(Object).isRequired,
  posterUrl: PropTypes.instanceOf(Object).isRequired,
}

function MovieDisplay(props) {

  const { classes, movie, posterUrl } = props
  // if (movie.Ratings

    const ratings = movie.Ratings && movie.Ratings.map((mrate, index) => {
      return (
        <li key={index}>
      {mrate.Source}: {mrate.Value}
    </li>
    )
  })
// }
  return (
    <div className={classes.main} >

      <div className={classes.title}>
        <Typography variant="h5"> { movie.Title } </Typography> 
        <div>Released: {movie.Year} | Rated: {movie.Rated} </div> <br/>
      </div>

      <div className={classes.poster} >
        <img src={posterUrl} alt="movie poster"/>
      </div>

      <div className={classes.info}>
        {/* <div> Released:  </div> <br/> */}
        <div> Directed by: 
          <p> {movie.Director} </p> 
        </div> <br/>
        <div> Genre:
            <p> {movie.Genre} </p>
        </div> <br/>
        <div> Starring: 
          <p> {movie.Actors} </p>
        </div> <br/>
      </div>

      <div className={classes.plot} > 
        <div> Released: {movie.Plot} </div> 
      </div> 

      <div className={classes.ratings} > 
          <div> Critics Ratings: <ul> { ratings } </ul> </div>
      </div> <br/>

    </div>
  )
}

const styles = theme => ({
  main: {
    display: 'inline-grid',
    gridTemplateAreas: `
      "title title"
      "poster info"
      "plot plot"
      "ratings ratings"
    `,
    // gridTemplateAreas: `
    //   "title title"
    //   "poster rated"
    //   "poster year"
    //   "poster mrate"
    //   "poster desr"
    // `,
    gridTemplateColumns: '2fr 3fr',
    gridTemplateRows: '1fr 3fr 1fr 1fr',
    maxWidth: 500,
  },

  title: {
    gridArea: 'title',
    padding: theme.spacing.unit,
  },

  info: {
    // justifyContent:'right,'
    textAlign: 'left',
    gridArea: 'info',
    padding: theme.spacing.unit ,
  },

  poster: {
    width: '75%',
    gridArea: 'poster',
    padding: theme.spacing.unit,
  },

  plot: {
    gridArea: 'plot',
    textAlign: 'left',
    padding: theme.spacing.unit,
  },

  ratings: {
    gridArea: 'ratings',
    textAlign: 'left',
    padding: theme.spacing.unit,
  }

})

export default withStyles(styles)(MovieDisplay)
