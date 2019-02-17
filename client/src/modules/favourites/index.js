// export core component
export { default as FavouritesButton } from './FavouritesButton';
export { default as FavouritesContainer } from './FavouritesContainer';
export { default as favouritesReducer } from './redux/favouritesReducer';
// export Redux
export {
  addFavourite,
  getFavourites,
  isFavourited,
  removeFavourite,
}
from './redux/favouritesActions';
