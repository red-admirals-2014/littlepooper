class User < ActiveRecord::Base
  has_secure_password
  validates :username, presence: true, uniqueness: true
  validates :password_digest, presence: true

  def self.highscores
    User.order(flappy_high_score: :desc).limit(10)
  end

  def updatescores(score)
    if score > self.flappy_high_score
      self.update_attributes(flappy_high_score: score)
    end
    self.update_attributes(total_points: self.total_points+score)    
  end

end
