# for assigning favourites to movies (later comments and users)
class Favourite < ApplicationRecord
  belongs_to :user
  belongs_to :favourited, polymorphic: true
  # ensure only 1 like per user per
  validates :user_id, uniqueness: {
    scope: [:favourited_id, :favourited_type],
    message: "You've already favourited this film!" 
  }

  def initialize
    errors = ActiveModel::Errors.new(self)
  end
  # allows validation of existing favourite via #index/get
  def self.search(search)

    @uid = search[:user_id]
    @fid = search[:favourited_id]

    # not passing a :search symbol so need to check search values are present
    # if at least one argument is present, validate the favourite
    if @uid || @fid
      # if only one argument is present, notify the issue
      if !@uid || !@fid
        "missing an argument (user_id or favourited_id)"
      else
        # returns a boolean value
        self.exists?( user_id: @uid, favourited_id: @fid )
      end
    # if no search request submitted, return full #index, as normal
    else
      self.all
    end

  end

end
