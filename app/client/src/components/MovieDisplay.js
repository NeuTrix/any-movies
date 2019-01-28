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
    return ( <li key={index}> {actor} </li> )
  })

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

        <div>
          <h4> Genre: </h4>
          <p> {movie.Genre} </p>
        </div> 

        <div> 
          <h4> Director: </h4>
          <p> {movie.Director} </p> 
        </div> 
       
        <div> 
          < h4 > Starring: </h4>
          <ul> { actors } </ul>
        </div> 
       
        <div> 
          < h6 > imdbID: </h6>
          <p> { movie.imdbID } </p>
        </div> 

      </div>

      <div className={classes.ratings} > 
          <div> Critics Ratings: <ul> { ratings } </ul> </div>
      </div>
      
      <div className={classes.ruledLine}/>

      <div className={classes.plot} > 
        <div> Released: {movie.Plot} </div> 
      </div> 

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
      "ruled ruled"
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
    paddingLeft: theme.spacing.unit * 2,
    paddingRight: theme.spacing.unit * 2,
  },

  ratings: {
    gridArea: 'ratings',
    textAlign: 'left', 
    paddingLeft: theme.spacing.unit * 2,
    paddingRight: theme.spacing.unit * 2,
  },

  ruledLine: {
    gridArea: 'ruled',
    border: '1px solid black',
    height: 0,
    margin: '0px 10px 0px 10px',
  }
})

export default withStyles(styles)(MovieDisplay)
