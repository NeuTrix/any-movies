import React from 'react';
import FavouritesBar  from './FavouritesBar';
import { connect } from 'react-redux';

// convert array of indexes into array of movie poster objects
export function makeFavouritesPosterArray(indexes, dictionary) {
  if (!indexes || !dictionary) { return [] }

  const bundle = indexes.map(fav => {
    return (
      <img 
        key="fav" 
        src={dictionary[fav].poster} 
        alt="movie poster"
      />
      )
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
