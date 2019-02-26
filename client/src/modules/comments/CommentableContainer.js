// container to gather Comment logic
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import CommentsPage from './CommentsPage';
import CommentCard from './CommentCard';

const propTypes = {
	comments: PropTypes.instanceOf(Object), // a possible list of curr comments
	commentable: PropTypes.instanceOf(Object).isRequired, // comment belongs to...
	currUser: PropTypes.instanceOf(Object).isRequired,
};

const defaultProps = {
	commentable: {},
	comments: [],
};

class CommentableContainer extends Component {
	constructor(props) {
		super(props);
		this.state = {
			comments: [], // generated sub comments for this instance
		};
		// CRUD functions
		this.addComment = this.addComment.bind(this); // Create
		this.editComment = this.editComment.bind(this); // Update
		this.getComments = this.getComments.bind(this); // Read
		this.deleteComment = this.deleteComment.bind(this); // Delete
	}

	componentDidUpdate(prevProps, prevState) {
		// need better logic=- how to get commentable id?
		if (prevProps.comments.length !== this.props.comments.length) {
			this.getComments();
		}
	}

	

	editComment({ commentable, data }) {
		return axios.put(`/api/comments/${commentable.id}`, data)
			.then((resp) => {
				this.setState({ showingCommentForm: false });
				if (resp.status === 200) {
					alert(`Your comment was EDITED! \n Status code: ${resp.status} \n commentable_id: ${resp.data.id}`);
				} else {
					alert(`Caution. Status code ${resp.status}`);
				}
				return resp.data;
			})
			.then(() => {
				// update the subcomments object
				this.setState({ showingCommentForm: false });
				this.getComments();
			})
			.catch((err) => {
				alert(`There was a problem editing your comment. \n "CommentableContainer" \n ${err}`);
				console.log('ERROR=>', err);
			});
	}

	deleteComment(id) {
		return axios.delete(`/api/comments/${id}`)
			.then((resp) => {
				this.setState({ showingCommentForm: false });
				// -> make another .then to reply upon confirmatio or status vs alert
				if (resp.status === 204) {
					alert(`Your comment was deleted! \n Status code: ${resp.status} \n commentable_id: ${resp.data.id}`);
				} else {
					alert(`Caution. Status code ${resp.status}`);
				}
				return resp.data;
			})
			.then(() => {
				this.getComments();
			})
			.catch((err) => {
				alert(`There was a problem deleting your comment. \n "CommentableContainer" \n ${err}`);
				console.log('ERROR=>', err);
			});
	}


	render() {
		//  dconstruct props
		const { currUser } = this.props;
		// build comment cards
		

		return (
	<CommentsPage
				// commentsList={commentsList}
				currUser={currUser}
				handleGetComments={this.getComments} // get items for this commentable
			/>
		);
	}
}

CommentableContainer.propTypes = propTypes;
CommentableContainer.defaultProps = defaultProps;

export default CommentableContainer;
