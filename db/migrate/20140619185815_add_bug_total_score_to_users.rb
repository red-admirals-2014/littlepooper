class AddBugTotalScoreToUsers < ActiveRecord::Migration
  def change
    add_column :users, :bug_total_score, :integer, default: 0
  end
end
