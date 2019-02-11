# for assigning favourites to movies (later comments and users)
class Favourite < ApplicationRecord
  belongs_to :user
  belongs_to :favourited, polymorphic: true
  # ensure only 1 like per user per
  validates :user_id, uniqueness: {
    scope: [:favourited_id, :favourited_type],
    message: "You've already favourited this film!" 
  }

  # allows validation of existing favourite via #index, without knowing id
  # works from the OMDB api movie id vs internal api search
  def self.verify(data)

    @fid = data[:favourited_id]
    @fit = data[:favourited_type]
    @uid = data[:user_id]

    # distinguish whether this is an index vs verification action
      if @fid || @fit || @uid
        "there's data"
    #   # confirm whether this item is currently favoured
    #   exists = self.exists?( 
    #     favourited_id: @fid, 
    #     favourited_type: @fit, 
    #     user_id: @uid
    #   )
      # # if it is favoured already, then retrieve it
      # if exists
      #   {
      #     # retrutn id of the favoured instance and a boolean confirmation
      #     id: self.where(
      #       favourited_id: @fid,
      #       favourited_type: @fit,
      #       user_id: @uid
      #     ).ids[0], # return only one object vs the array (should only be one)
          
      #     exists: exists
      #   }

      # else
      #   # if the favoured item does not exist, return a null object
      #   { id: 'null', exists: exists}
      # end
    else
      # if no search request submitted, return full #index, as normal
      # self.all
      "no data- get index"
    end
  end
end
