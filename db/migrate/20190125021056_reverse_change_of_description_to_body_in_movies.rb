class ReverseChangeOfDescriptionToBodyInMovies < ActiveRecord::Migration[5.2]
  def change
    change_table :movies do |t|
      t.rename :body, :description
    end
  end
end
