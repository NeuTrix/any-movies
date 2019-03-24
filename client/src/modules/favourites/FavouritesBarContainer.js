import React from 'react';
import FavouritesBar  from './FavouritesBar';
import FavouritesPosterContainer from './FavouritesPosterContainer';
import { connect } from 'react-redux';

// convert array of indexes into array of movie poster objects
export function makeFavouritesPosterArray(indexes, dictionary) {
  // gaurd against null intial state
  if (!indexes || !dictionary) { return []; }

  const bundle = indexes.map(fav => {
    const item = dictionary[fav];

    return  <FavouritesPosterContainer 
      key={item.favourited_id} 
      poster={item.poster} 
      title={item.favourited_title}
    /> 
  })

  return bundle.reverse();
}

const mapStateToProps = state => {
  const indexes = state.favourites.indexes;
  const dictionary = state.favourites.dictionary;

  return { posters: makeFavouritesPosterArray(indexes, dictionary) }
};

// wrap around MainCommentsBar component
const FavouritesBarContainer = connect(
  mapStateToProps,
)(FavouritesBar);

export default FavouritesBarContainer;
