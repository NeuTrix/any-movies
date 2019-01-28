# set up commentable item for comments of comments
module Api
  module Comments
    class CommentsController < Api::CommentsController
      before_action :set_commentable

      private

      def set_commentable
        @commentable = Comment.find(params[:comment_id])
      end
    end
  end
end
