class AddBugHighScoreToUsers < ActiveRecord::Migration
  def change
    add_column :users, :bug_high_score, :integer, default: 0
  end
end
