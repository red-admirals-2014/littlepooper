class AddBugsKilledToUser < ActiveRecord::Migration
  def change
  	add_column :users, :bugs_killed, :integer, default: 0
  end
end
