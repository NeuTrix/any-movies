// export core component
export { default as FavouritesContainer } from './FavouritesContainer'
export { default as FavouriteButton } from './FavouriteButton';

// export Redux
export {
  addFavourite,
  getFavourites,
  isFavourited,
  removeFavourite,
}
from './redux/favouritesActions';
