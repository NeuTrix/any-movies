require 'test_helper'

class UsersControllerTest < ActionDispatch::IntegrationTest
  setup do
    @user = users(:one)
  end

  test "should get index" do
    # skip
    get api_users_url, as: :json
    assert_response :success
  end

  test "should create user" do
    # skip
    assert_difference('User.count') do
      post api_users_url(@user), params: { user: { 
        username: @user.username, 
        email: @user.email,
        password: "wonderful", 
        password_confirmation: "wonderful"
      } }, as: :json
    end

    assert_response 201
  end

  test "should show user" do
    # skip
    get api_user_url(@user), as: :json
    assert_response :success
  end

  test "should update user" do
    # skip
    patch api_user_url(@user), params: { user: { username: @user.username } }, as: :json
    assert_response 200
  end

  test "should destroy user" do
    # skip
    assert_difference('User.count', -1) do
      delete api_user_url(@user), as: :json
    end

    assert_response 204
  end
end
