class AddPetnameColumnToUsers < ActiveRecord::Migration
  def change
    add_column :users, :petname, :string
  end
end
