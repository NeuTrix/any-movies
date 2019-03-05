class AddSubCommentsArrayToComment < ActiveRecord::Migration[5.2]
  def change
    add_column :comments, :sub_comments, :text
  end
end
