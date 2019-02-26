// import React, { Component } from 'react';
// import PropTypes from 'prop-types';
// import { withStyles } from '@material-ui/core/styles';
// import Typography from '@material-ui/core/Typography';
// import { getFavourites } from '../../actions/favouritesActions';

// const propTypes = {
// 	classes: PropTypes.instanceOf(Object).isRequired,
// 	currUser: PropTypes.instanceOf(Object).isRequired,
// 	favsArray: PropTypes.instanceOf(Array).isRequired,
// };

// class FavouritesPage extends Component {
	
// 	constructor(props) {
// 		super(props);
// 		this.state = {
// 			favourites: [],
// 		};
// 	}

// 	componentDidMount() {
// 		const { currUser } = this.props;
// 		getFavourites(currUser.id)
// 			.then(resp => this.setState({ favourites: resp }))
// 			.catch(err => console.log('Err: FavouritesPage', err));
// 	}

// 	render() {

// 		const { classes, currUser } = this.props;
// 		console.log('ppppppp==>>', this.state.favourites)
		
// 		let array = this.state.favourites.map(e => {
// 			return ( <li> { e.id } </li> )
// 		})
		
// 		return <div> {array} </div>
// 	}
// }

// const styles = theme => ({

// 	main: {
// 		border: '1px solid lightgrey',
// 		display: 'inline-grid',
// 		// gridTemplateAreas: `
//     //   "titlebar titlebar"
//     //   "image info"
//     //   "plot plot"
//     //   "ratings ratings"
//     // `,
// 		// gridTemplateColumns: '2fr 3fr',
// 	},


// });

// FavouritesPage.propTypes = propTypes;

// export default withStyles(styles)(FavouritesPage);
