class Movie < ApplicationRecord
  # commentable id sets to 0 for each movie when chg primary keyto imdb_id
  # self.primary_key = 'imdb_id'
  validates :imdb_id, uniqueness: {message: "Movie already in app database"}
  has_many :comments, as: :commentable, dependent: :destroy
  has_many :users, through: :comments
end
