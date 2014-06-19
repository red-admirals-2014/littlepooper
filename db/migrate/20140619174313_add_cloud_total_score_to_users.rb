class AddCloudTotalScoreToUsers < ActiveRecord::Migration
  def change
    add_column :users, :cloud_total_score, :integer, default: 0
  end
end
