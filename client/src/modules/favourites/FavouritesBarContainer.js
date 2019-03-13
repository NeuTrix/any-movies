import React from 'react';
import FavouritesBar  from './FavouritesBar';
import FavouritesPoster from './FavouritesPoster';
import { connect } from 'react-redux';

// convert array of indexes into array of movie poster objects
export function makeFavouritesPosterArray(indexes, dictionary) {
  // gaurd against null intial state
  if (!indexes || !dictionary) { return [] }

  const bundle = indexes.map(fav => {
    return  <FavouritesPoster key="fav" poster={dictionary[fav].poster} /> 
  })

  return bundle;
}

const mapStateToProps = (state) => {
  console.log(88, '==>', state.favourites.indexes);
  const indexes = state.favourites.indexes;
  const dictionary =  state.favourites.dictionary;
    
  return { posters: makeFavouritesPosterArray(indexes, dictionary) }
};


// wrap around MainCommentsBar component
const FavouritesBarContainer = connect(
	mapStateToProps, 
)(FavouritesBar);

export default FavouritesBarContainer;
