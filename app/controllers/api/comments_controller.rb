module Api
  class CommentsController < ApplicationController
    # before_action :authenticate_user
    before_action :set_comment, only: [:show, :update, :destroy]

    # GET /comments
    def index
      @comments = @commentable.comments
      Comment.update_sub_comments(@comments)
      render json: @comments
    end

    # GET /comments/1
    def show
      render json: @comment
    end

    # POST /comments
    def create
      @comment = @commentable.comments.build(comment_params)
      
      if @comment.save
        # add sub comments to the instance attribute
        if @commentable.commentable_type == 'Comment'
          @commentable.sub_comments << @comment
          @commentable.save
        end
        render json: @comment, status: :created
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
        # needed to remove .require(:comment) to use #create
        params.permit(
          :author,
          :imdb_id,
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