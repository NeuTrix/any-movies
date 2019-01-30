// container to gather movie logic
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
// import shortid from 'shortid';
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
      userID: 1, // must use an exisiting user_id
    }

    this.addReview = this.addReview.bind(this);
    this.getMovieData = this.getMovieData.bind(this);
    this.toggleForm = this.toggleForm.bind(this);
  }
  
  // set initial state of the page
  componentDidMount(){
    this.getMovieData('Alien')
  }

  // adds a new review for a Movie
  addReview(data) {
    // data is a state object, passed from the form
    console.log("===> Review Added", data)
    // /api/movies / tt0076759 / comments ?
    const { commentableID, commentableType } = this.state;
    // determine rails path for commentable
    let pathType = commentableType === 'Movie' ? 'movies' : 'comments'

    return axios.post(`/api/${pathType}/${commentableID}/comments`, data)
      .then(resp => {
        console.log('KKKKK==> addRev data',resp)
        // return resp.data
      })
      .catch(err => { 
        console.log('ERROR=>',err); 
      })
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
