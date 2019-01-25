module Api
  class CommentsController < ApplicationController
    # before_action :authenticate_user
    before_action :set_comment, only: [:show, :update, :destroy]

    # GET /comments
    def index
      @comments = Comment.all
      render json: @comments
    end

    # GET /comments/1
    def show
      render json: @comment
    end

    # POST /comments
    def create
      @comment = @commentable.comments.build(comment_params)
      @comment.user = current_user

      if @comment.save
        # render json: @current_user, status: :created
        render "passed the saved comment"
        # , location: @comment
      else
        render json: @comment.errors, status: :unprocessable_entity
      end
    end

    # PATCH/PUT /comments/1
    def update
      if @comment.update(comment_params)
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
        params. permit(:title, :body, :user_id, :commentable_id, :commentable_type, :rating)
      end
  end
end