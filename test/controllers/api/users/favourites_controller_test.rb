require 'test_helper'

class Api::Users::FavouritesControllerTest < ActionDispatch::IntegrationTest

  setup do
    @favourite = favourites(:one)
    @user = users(:one)
  end

  test "it should verify movie is favourited" do
    # skip
    post api_users_favourites_url, params: {
      user_id: @user.id,
      favourited_id: @favourite.favourited_id,
      favourited_type: @favourite.favourited_type
    }

    assert_response :false
    
  end



end
