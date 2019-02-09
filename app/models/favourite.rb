# for assigning favourites to movies (later comments and users)
class Favourite < ApplicationRecord
  belongs_to :user
  belongs_to :favourited, polymorphic: true
  # ensure only 1 like per user per
  validates :user_id, uniqueness: {
    scope: [:favourited_id, :favourited_type],
    message: "You've already favourited this film!" 
  }

  # allows validation of existing favourite via #index/get
  def self.verify(data)

    @uid = data[:user_id]
    @fid = data[:favourited_id]
    @fit = data[:favourited_type]

    # not passing a :symbol so need to verify this is a search vs index action
    if @uid && @fid && @fit

      exists = self.exists?( 
        user_id: @uid, 
        favourited_id: @fid, 
        favourited_type: @fit 
      )
      
      if exists
        {
          id: self.where(
            user_id: @uid,
            favourited_id: @fid,
            favourited_type: @fit
          ).ids[0], # return the object vs the array

          exists: exists
        }

      else
        { id: 'null',  exists: exists }
      end
    else
      # if no search request submitted, return full #index, as normal
      self.all
    end
  end
end
