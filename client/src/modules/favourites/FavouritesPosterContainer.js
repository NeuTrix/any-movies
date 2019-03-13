import { connect } from 'react-redux';
import FavouritesPoster from './FavouritesPoster';
import { getMovieData } from '../movies/redux/moviesActions';


const mapDispatchToProps = (dispatch) => ({
  getMovieData: (title) =>  dispatch(getMovieData(title))
})

// wrap around MainCommentsBar component
const FavouritesPosterContainer = connect(
  null, 
  mapDispatchToProps,
)(FavouritesPoster);

export default FavouritesPosterContainer;
