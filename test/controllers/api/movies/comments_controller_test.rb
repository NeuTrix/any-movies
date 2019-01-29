require 'test_helper'

class Api::Movies::CommentsControllerTest < ActionDispatch::IntegrationTest

  setup do
    @movie = movies(:alien)
    @user = users(:one)

    # @comment = @commentable
  end

  test "should get index of comments" do
    skip
    get api_movie_comments(@movie), as: :json
    assert_response :success
  end

  test "should create comment" do
    # skip
    assert_difference('Comment.count') do
      # post api_movie_comments_url(@movie), params: { comment: { 
      post api_movie_comments_url(@movie), params: { movie: { 
        user_id: @user.id,
        # movie_id: @movie.id,
        critic_rating: @movie.critic_rating, 
        description: @movie.description, 
        rated: @movie.rated, 
        release_date: @movie.release_date, 
        title: @movie.title 
      } }, as: :json
    end

    assert_response 201
  end

  test "should show movie" do
    # skip
    get api_movie_url(@movie), as: :json
    assert_response :success
  end

  test "should update movie" do
    # skip
    patch api_movie_url(@movie), params: { movie: { critic_rating: @movie.critic_rating, description: @movie.description, rated: @movie.rated, release_date: @movie.release_date, title: @movie.title } }, as: :json
    assert_response 200
  end

  test "should destroy movie" do
    # skip
    assert_difference('Movie.count', -1) do
      delete api_movie_url(@movie), as: :json
    end

    assert_response 204
  end
end

