import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import { FavouritesButtonContainer } from '../favourites';

const propTypes = {
  classes: PropTypes.instanceOf(Object).isRequired,
  movie: PropTypes.instanceOf(Object).isRequired,
  // functions
  getAllMovies: PropTypes.instanceOf(Function).isRequired,
  getComments: PropTypes.instanceOf(Function).isRequired,
  getUsersFavourites: PropTypes.instanceOf(Function).isRequired,
  isMovieRegistered: PropTypes.instanceOf(Function).isRequired,
  isFavourited: PropTypes.instanceOf(Function).isRequired,
  user: PropTypes.instanceOf(Object).isRequired,
};

class MoviePage extends Component {

  componentDidUpdate(prevProps) {
    const {
      getAllMovies,
      getComments,
      getUsersFavourites,
      isFavourited,
      isMovieRegistered,
      movie,
      user,
    } = this.props;

    if (movie !== prevProps.movie) {
      const update = new Promise(res => res());
      update.then(() => getComments())
        .then(() => isMovieRegistered(movie.imdbID))
        .then(() => getAllMovies()) // update the full dictionary (helps favs)
        .then(() => isFavourited({ movieID: movie.imdbID, userID: user.id }))
        .then(() => getUsersFavourites(user.id))
        .catch(err => console.log(err));
    }
  }

  render() {
    const { classes, movie } = this.props;
    // generate list of movie ratings
    const ratings = movie.Ratings && movie.Ratings.map(rating => (
      <div key={movie.Source} className={classes.ratingUnit}>
        <div style={{ gridArea: 'critic' }}>{`${rating.Source} :`}</div>
        <div style={{ gridArea: 'grade', textAlign: 'right' }}>
          { rating.Value }
        </div>
      </div>
    ));

    return (
      <div className={classes.main}>

        <div className={classes.titlebar}>
          <div className={classes.fav}>
						<FavouritesButtonContainer currUserId={1} movie={movie} />
          </div>

					<div className={classes.title}>
 						<Typography variant="h4"> { movie.Title } </Typography>
					</div>
				</div>

				<div className={classes.image}>
					<img className={classes.poster}
						src={movie.Poster}
						alt="movie poster"
					/>
					<div> {`Released...${movie.Year}`} </div> <br />
					<div> {'Rated'} <h3> { movie.Rated } </h3> </div>
					<div> <h6> { `imdbID: ${movie.imdbID}` } </h6> </div>
				</div>

				<div className={classes.info}>
					<div> <h4> {'Genre:'} </h4> <p> {movie.Genre} </p> </div>
					<div> <h4> { 'Director:' } </h4> <p> {movie.Director} </p> </div>
					<div> <h4> {' Starring:' } </h4> <p> { movie.Actors } </p> </div>
				</div>

				<div className={classes.ratings}>
					<div>
						<h4>Critics Ratings:</h4>
						<p>{ ratings }</p>
						<br />
					</div>
				</div>

        <div className={classes.plot}>
					<h4>Movie Plot:</h4>
					<p>{ movie.Plot }</p>
				</div>

      </div>
    );
  }
}

const styles = theme => ({
  fav: {
    display: 'inherit',
    gridArea: 'fav',
    padding: theme.spacing.unit,
    placeContent: 'center',
  },

  image: {
    borderRight: '1px solid lightgrey',
    gridArea: 'image',
    padding: theme.spacing.unit,
  },

  info: {
    gridArea: 'info',
    padding: theme.spacing.unit * 2,
    textAlign: 'left',
  },

  main: {
    border: '1px solid lightgrey',
    display: 'inline-grid',
    gridTemplateAreas: `
      "titlebar titlebar"
      "image info"
      "plot plot"
      "ratings ratings"
    `,
    gridTemplateColumns: '2fr 3fr',
  },

  plot: {
    border: '1px solid lightgrey',
    gridArea: 'plot',
    padding: theme.spacing.unit,
    textAlign: 'left',
  },

  poster: {
    maxWidth: 125,
    padding: theme.spacing.unit,
  },

  ratingUnit: {
    display: 'grid',
    gridTemplateAreas: `
      "critic grade"
    `,
    gridTemplateColumns: '3rf 1fr',
  },

  ratings: {
    gridArea: 'ratings',
    padding: theme.spacing.unit,
    textAlign: 'left',
  },

  title: {
    fontColor: 'white',
    gridArea: 'title',
    padding: theme.spacing.unit,
  },

  titlebar: {
    backgroundColor: 'lightgrey',
    borderBottom: '1px solid lightgrey',
    display: 'inline-grid',
    fontColor: 'white',
    gridArea: 'titlebar',
    gridTemplateAreas: `
			"fav title"
		`,
    gridTemplateColumns: '1fr 9fr',
    padding: theme.spacing.unit,
  },
});

MoviePage.propTypes = propTypes;

export default withStyles(styles)(MoviePage);
