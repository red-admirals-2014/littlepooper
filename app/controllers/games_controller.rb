class GamesController < ApplicationController
  before_filter :check_logged
  layout 'game'

  def home
  end

  def set_pet_stats
    current_user.update_attributes(pet_happiness: params[:happiness].to_i, pet_strength: params[:strength].to_i, pet_nomnom: params[:nomnom].to_i, pet_xp: params[:xp].to_i)
    render nothing: true
  end

  def get_pet_stats
    render json: {happiness: current_user.pet_happiness, strength: current_user.pet_strength, nomnom: current_user.pet_nomnom, xp: current_user.pet_xp}
  end

  def flappy_high_score
    updated_xp = current_user.pet_xp + 10*params[:score].to_i
    current_user.update_attributes(pet_xp: updated_xp)

    current_user.updatescores(params[:score].to_i)
    render nothing: true
  end

  def flappy_high_scores
    @highscores = User.highscores
    @highscores = @highscores.to_json
    render json: {highscores: @highscores}
  end

  def set_bugs_killed
    updated_xp = current_user.pet_xp + params[:bugs_killed].to_i
    lifetime_bugs_killed = current_user.bugs_killed + params[:bugs_killed].to_i

    current_user.update_attributes(pet_xp: updated_xp, bugs_killed: lifetime_bugs_killed)
    render nothing: true
    
  end
  
end