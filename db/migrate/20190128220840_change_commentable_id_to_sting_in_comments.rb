class ChangeCommentableIdToStingInComments < ActiveRecord::Migration[5.2]
  def change
    change_column :comments, :commentable_id, :string
  end
end
