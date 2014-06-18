class AddPetStatsToUser < ActiveRecord::Migration
  def change
  	add_column :users, :pet_happiness, :integer, default: 100
    add_column :users, :pet_strength, :integer, default: 100
    add_column :users, :pet_nomnom, :integer, default: 100
    add_column :users, :pet_xp, :integer, default: 0
  end
end
