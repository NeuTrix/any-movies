import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

const propTypes = {
  posters: PropTypes.instanceOf(Array).isRequired,
}

const FavouritesBar = ({posters}) => {
  return (
    <div>
      {posters}
    </div>
  )
}


FavouritesBar.propTypes = propTypes;

export default FavouritesBar;
