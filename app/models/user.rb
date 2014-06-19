class User < ActiveRecord::Base
  has_secure_password
  validates :username, presence: true, uniqueness: true
  validates :password_digest, presence: true

  def self.highscores
    User.order(flappy_high_score: :desc).limit(10)
  end

  def self.cloud_highscores
    User.order(cloud_high_score: :desc).limit(10)
  end

  def update_pet_stats(stats)
    self.update_attributes(pet_happiness: stats[:happiness].to_i, pet_strength: stats[:strength].to_i, pet_nomnom: stats[:nomnom].to_i, pet_xp: stats[:xp].to_i)
  end

  def update_cloud_stats_and_xp(score)
    if score > self.cloud_high_score
      self.update_attributes(cloud_high_score: score)
    end
    updated_cloud_total = self.cloud_total_score+score
    updated_xp = self.pet_xp + score
    self.update_attributes(cloud_total_score: updated_cloud_total, pet_xp: updated_xp)    
  end

  def update_flappy_stats_and_xp(score)
    if score > self.flappy_high_score
      self.update_attributes(flappy_high_score: score)
    end
    updated_flappy_total = self.total_points+score
    updated_xp = self.pet_xp + 10 * score
    self.update_attributes(total_points: updated_flappy_total, pet_xp: updated_xp)    
  end

  def update_bug_stats_and_xp(bugs_killed)
    updated_xp = self.pet_xp + bugs_killed
    updated_bugs_killed = self.bugs_killed + bugs_killed
    self.update_attributes(pet_xp: updated_xp, bugs_killed: updated_bugs_killed)
  end
  
  def self.rankings
    User.order(pet_xp: :desc).limit(10)
  end

end
