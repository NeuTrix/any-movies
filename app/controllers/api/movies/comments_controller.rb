module Api
  module Movies
    class CommentsController < Api::CommentsController
        before_action :set_commentable

      private 

      def set_commentable
        @commentable = Movie.find(params[:movie_id])
      end
      
    end
  end
end
