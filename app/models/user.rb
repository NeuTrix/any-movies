class User < ApplicationRecord
  has_secure_password
  has_many :comments, dependent: :destroy
  # users can be favorited by other users

  has_many :favourites, dependent: :destroy
  # method to grab fav movies

  has_many  :favourite_movies,
            through: :favourites,
            source: :favourited,
            source_type: 'Movie',
            dependent: :destroy

  # own movie through favourites
  has_many :movies, through: :favourites

  # this may be better to own through favourites vs comments
  # has_many :movies, through: :comments
end
