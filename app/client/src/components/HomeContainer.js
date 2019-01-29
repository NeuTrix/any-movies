// container to gather movie logic
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { url_movie_data} from '../helpers/api.helper';
import HomePage from './HomePage';

const propTypes = { }

class HomeContainer extends Component {
  constructor(props) {
    super(props)

    this.state = {
      commentableID: 'Movie default',
      commentableType: 'Movie',
      movie: {},
    }
    this.getMovieData = this.getMovieData.bind(this);
    this.addReview = this.addReview.bind(this);
  }
  
  // set initial state of the page
  componentDidMount(){
    this.getMovieData('Alien')
  }

  addReview(){
    alert("review Added")
  }
  // get the movie data
  getMovieData(searchTerm) {

    axios.get(`${url_movie_data}&t=${searchTerm}`)
      .then(resp => {
        const data = resp.data

        if (data.Error) {
          alert(`Error: ${data.Error} for:\n => ${searchTerm} <= \nTry again`)
        } 

        this.setState({ movie: data, commentableID: data.imdbID })
      })
      .catch(err => { 
        console.log('===>Error',err) 
      })
  }

  render() {
    const { movie, commentableID, commentableType } = this.state
    return (
      <HomePage 
        movie={movie}
        commentableID={commentableID}
        commentableType={commentableType}
        getMovieData={this.getMovieData}
        addReview={this.addReview}
      />
    )
  }
}

HomeContainer.propTypes = propTypes;

export default HomeContainer
