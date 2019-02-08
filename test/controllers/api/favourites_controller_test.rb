require 'test_helper'

  class Api::FavouritesControllerTest < ActionDispatch::IntegrationTest
  setup do
    @favourite = favourites(:one)
    @user = users(:one)
  end

  test "should get index" do
    skip
    get api_favourites_url, as: :json
    assert_response :success
  end

  test "should create favourite" do
    # skip
    # assert_difference('Favourite.count') do
      post api_favourites_url,
      params:  {
        favourited_id: "tt0078748",
        # favourited_id: @favourite.favourited_id,
        favourited_type: "Movie",
        user_id: @user.id
      } , as: :json
    # end

    assert_response 201
  end

  test "should show favourite" do
    skip
    get api_favourites_url(@favourite), as: :json
    assert_response :success
  end

  test "should update favourite" do
    skip
    patch api_favourite_url(@favourite), params: { favourite: { favourited_id: @favourite.favourited_id, favourited_type: @favourite.favourited_type, user_id: @favourite.user_id } }, as: :json
    assert_response 200
  end

  test "should destroy favourite" do
    skip
    assert_difference('Favourite.count', -1) do
      delete api_favourite_url(@favourite), as: :json
    end

    assert_response 204
  end
end
