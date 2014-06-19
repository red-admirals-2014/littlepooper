class AddCloudHighScoreToUsers < ActiveRecord::Migration
  def change
    add_column :users, :cloud_high_score, :integer, default: 0
  end
end
