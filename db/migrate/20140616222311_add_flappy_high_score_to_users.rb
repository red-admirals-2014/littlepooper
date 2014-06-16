class AddFlappyHighScoreToUsers < ActiveRecord::Migration
  def change
    add_column :users, :flappy_high_score, :integer, default: 0
  end
end
