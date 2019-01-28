class AddUnigueAndNullImdbIdToMovies < ActiveRecord::Migration[5.2]
  def change
    change_column_null :movies, :imdb_id, false
  end
end
