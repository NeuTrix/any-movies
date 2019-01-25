require 'test_helper'

class Api::MoviesControllerTest < ActionDispatch::IntegrationTest
  setup do
    @movie = movies(:one)
  end

  test "should get index" do
    # skip
    get api_movies_url, as: :json
    assert_response :success
  end

  test "should create movie" do
    # skip
    assert_difference('Movie.count') do
      post api_movies_url, params: { movie: { 
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
