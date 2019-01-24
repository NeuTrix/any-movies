class User < ApplicationRecord
  has_many :comments, dependent: :destroy
  has_many :movies, through: :comments
  has_secure_password
end
