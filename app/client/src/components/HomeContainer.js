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
      showForm: false,
      user_id:'default',
    }
    
    this.addReview = this.addReview.bind(this);
    this.getMovieData = this.getMovieData.bind(this);
    this.toggleForm = this.toggleForm.bind(this);
  }
  
  // set initial state of the page
  componentDidMount(){
    this.getMovieData('Alien')
  }

  addReview(data){
    console.log("===> Review Added", data)
    // toggle
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

  toggleForm() {
    this.setState({ showForm: !this.state.showForm });
  }

  render() {
    
    return (
      <HomePage 
      commentableID={this.state.commentableID}
      commentableType={this.state.commentableType}
      movie={this.state.movie}
      showForm={this.state.showForm}
      userID={this.state.userID}
      // functions
      addReview={this.addReview}
      getMovieData={this.getMovieData}
      toggleForm={this.toggleForm}
      />
    )
  }
}

HomeContainer.propTypes = propTypes;

export default HomeContainer
