class AddImbdIdToMovies < ActiveRecord::Migration[5.2]
  def change
    add_column :movies, :imdb_id, :string
  end
end
