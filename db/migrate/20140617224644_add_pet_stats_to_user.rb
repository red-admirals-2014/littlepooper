class AddPetStatsToUser < ActiveRecord::Migration
  def change
    add_column :users, :pet_happiness, :integer
    add_column :users, :pet_strength, :integer
    add_column :users, :pet_nomnom, :integer
    add_column :users, :pet_xp, :integer
  end
end
