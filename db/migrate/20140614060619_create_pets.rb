class CreatePets < ActiveRecord::Migration
  def change
    create_table :pets do |t|
      t.belongs_to :user
      t.string :name
      t.timestamps
    end
  end
end
