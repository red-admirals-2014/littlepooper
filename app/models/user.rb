class User < ActiveRecord::Base
  has_secure_password
  validates :username, presence: true, uniqueness: true
  validates :password_digest, presence: true

  def self.highscores
    User.order(flappy_high_score: :desc).limit(10)
  end

end
