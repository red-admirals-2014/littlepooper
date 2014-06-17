class GamesController < ApplicationController
  before_filter :check_logged

  def home
  end

  def flappy_high_score
    user = User.find(session[:user_id]) # replace this with current_user
    # move this logic to the model
    if params[:score].to_i > user.flappy_high_score
      user.update_attributes(flappy_high_score: params[:score].to_i)
    end
    user.update_attributes(flappy_high_score: user.flappy_high_score+params[:score].to_i)
    render :nothing => true
  end

  def flappy_high_scores
    render json: User.highscores
  end
  
end
