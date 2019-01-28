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
  
  // if (movie.Ratings) listed, show them
  const ratings = movie.Ratings && movie.Ratings.map((rating, index) => {
    return ( <li key={index}> {rating.Source}: {rating.Value} </li> )
  })

  // if actors listed, make a list
  const actors = movie.Actors && movie.Actors.split(',').map((actor, index) => {
    return ( <p key={index}> {actor} </p> )
  })

  return (
    <div className={classes.main} >

      <div className={classes.title}>
        <Typography variant="h3"> { movie.Title } </Typography> 
      </div>

      <div className={classes.image} >
        <img className={classes.poster} src={posterUrl} alt="movie poster"/>
        <div> Released: {movie.Year} </div>
        <div> Rated 
          <h3>{movie.Rated} </h3> 
        </div> 
        <div> <h6> imdbID: { movie.imdbID }</h6> </div>
      </div>

      <div className={classes.info}>

        <div>
          <h4> Genre: </h4>
          <p> {movie.Genre} </p>
        </div> 

        <div> 
          <h4> Director: </h4>
          <p> {movie.Director} </p> 
        </div> 
       
        <div> 
          <h4> Starring: </h4>
          <p> { actors } </p>
        </div> 
       
      </div>

      <div className={classes.ratings} > 
          <div> Critics Ratings: <ul> { ratings } </ul> </div>
      </div>
      
      <div className={classes.plot} > 
        <div> {movie.Plot} </div> 
      </div> 

    </div>
  )
}

const styles = theme => ({
  main: {
    display: 'inline-grid',
    gridTemplateAreas: `
      "title title"
      "image info"
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
    gridTemplateColumns: '2fr 2fr',
  },

  title: {
    gridArea: 'title',
    padding: theme.spacing.unit,
    borderBottom: '1px solid lightgrey',
  },

  info: {
    textAlign: 'left',
    gridArea: 'info',
    padding: theme.spacing.unit ,
  },

  image: {
    gridArea: 'image',
    padding: theme.spacing.unit,
    borderRight: '1px solid lightgrey',
  },

  poster: {
    maxWidth: 150,
    padding: theme.spacing.unit,
  },

  plot: {
    gridArea: 'plot',
    border: '1px solid lightgrey',
    padding: theme.spacing.unit * 2,
    textAlign: 'left',
  },

  ratings: {
    gridArea: 'ratings',
    textAlign: 'left', 
    padding: theme.spacing.unit * 2,
    // paddingRight: theme.spacing.unit * 2,
  },

})

export default withStyles(styles)(MovieDisplay)
