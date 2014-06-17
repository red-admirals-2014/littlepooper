class GamesController < ApplicationController
  before_filter :check_logged

  def home
  end

  def set_pet_stats
    user = User.find(session[:user_id])
    user.update_attributes(pet_happiness: params[:happiness].to_i, pet_strength: params[:strength].to_i, pet_nomnom: params[:nomnom].to_i)
    render nothing: true
  end

  def get_pet_stats
    user = User.find(session[:user_id])
    # render json: {happiness: user.pet_happiness.to_json, strength: user.pet_strength.to_json, nomnom: user.pet_nomnom.to_json}
    render json: {happiness: user.pet_happiness, strength: user.pet_strength, nomnom: user.pet_nomnom}

  end


  def flappy_high_score
    user = User.find(session[:user_id])
    if params[:score].to_i > user.flappy_high_score
      user.update_attributes(flappy_high_score: params[:score].to_i)
    end
    user.update_attributes(flappy_high_score: user.flappy_high_score+params[:score].to_i)
  end

  def flappy_high_scores
    @highscores = User.highscores
    @highscores = @highscores.to_json
    render json: {highscores: @highscores}
  end
  
end