module Api
  class CommentsController < ApplicationController
    # before_action :authenticate_user
    before_action :set_comment, only: [:show, :update, :destroy]

    # GET /comments
    def index
      @comments = @commentable.comments
      render json: @comments
    end

    # GET /comments/1
    def show
      render json: @comment
    end

    # POST /comments
    def create
      @comment = @commentable.comments.build(comment_params)
      # @comment.user_id = current_user.id

      if @comment.save
        render json: @comment, status: :created
        # render "passed the saved comment"
        # , location: @comment
      else
        render json: @comment.errors, status: :unprocessable_entity
      end
    end

    # PATCH/PUT /comments/1
    def update
      if @comment.update(comment_params)
        @comment.author = User.find(:user_id).username
        render json: @comment
      else
        render json: @comment.errors, status: :unprocessable_entity
      end
    end

    # DELETE /comments/1
    def destroy
      @comment.destroy
    end

    private
      # Use callbacks to share common setup or constraints between actions.
      def set_comment
        @comment = Comment.find(params[:id])
      end

      # Only allow a trusted parameter "white list" through.
      def comment_params
        params.require(:comment).permit(
          :author,
          :body, 
          :commentable_id, 
          :commentable_type, 
          :rating,
          :title, 
          :user_id, 
        )
      end
  end
end