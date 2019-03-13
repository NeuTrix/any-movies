import React from 'react';
import FavouritesBar  from './FavouritesBar';
import FavouritesPosterContainer from './FavouritesPosterContainer';
import { connect } from 'react-redux';
import { ClickAwayListener } from '@material-ui/core';

// convert array of indexes into array of movie poster objects
export function makeFavouritesPosterArray(indexes, dictionary) {
  // gaurd against null intial state
  if (!indexes || !dictionary) { return [] }

  const bundle = indexes.map(fav => {
    const item = dictionary[fav];

    return  <FavouritesPosterContainer 
      key={item.favourited_id} 
      poster={item.poster} 
      title={item.title}
    /> 
  })

  return bundle;
}

const mapStateToProps = state => {
  const indexes = state.favourites.indexes;
  const dictionary = state.favourites.dictionary;
  const movies = state.movies.dictionary;  
  
  return { posters: makeFavouritesPosterArray(indexes, dictionary) }
};

// wrap around MainCommentsBar component
const FavouritesBarContainer = connect(
  mapStateToProps, 
)(FavouritesBar);

export default FavouritesBarContainer;
