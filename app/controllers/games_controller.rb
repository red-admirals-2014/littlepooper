class GamesController < ApplicationController
  before_filter :check_logged

  def home
  end

  def flappy_high_score
    user = User.find(session[:user_id])
    if params[:score].to_i > user.flappy_high_score
      user.update_attributes(flappy_high_score: params[:score].to_i)
    end
  end
  
end