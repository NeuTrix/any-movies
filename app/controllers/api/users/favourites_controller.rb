class Api::Users::FavouritesController < ApplicationController
  before_action :set_user
  # :set_user_favourite

  # GET /users/user_id/favourites
  def index
    @user_favourites = Favourite.filter(params[:filter])

    render json: @user_favourites
  end

  def create
    @favourite = @user.favourites.build(user_favourite_params)

    if @favourite.save
      render json: @favourite, status: :created
    else
      render json: @favourite.errors, status: :unprocessable_entity
    end
  end

  # GET /users/user_id/favourites/favourite_id
  def show
    render json: @user
  end


  private
    # Use callbacks to share common setup or constraints between actions.
    def set_user
      @user = User.find(params[:user_id])
    end

    # def set_user_favourite
    #   @user_favourite = @user.favourites.find(favourited_id)
    # end
    

    # Only allow a trusted parameter "white list" through.
    def user_favourite_params
      # fav param is a bool to validate movie status for a user
      params.permit(
        :user_id, 
        :favourited_id, 
        :favourited_type, 
        :favourited_title, 
        :filter, 
        :poster
        )
    end
end
