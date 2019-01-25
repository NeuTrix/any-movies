class ChangeColumnDescriptionToBodyInMovies < ActiveRecord::Migration[5.2]
  def change
    change_table :movies do |t|
      t.remove :description
      t.text :body
    end
  end
end
