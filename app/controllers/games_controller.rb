class GamesController < ApplicationController
  before_filter :check_logged
  layout 'game'

  def home
  end

  def flappy_high_score
    current_user.updatescores(params[:score].to_i)
    render nothing: true
  end

  def flappy_high_scores
    @highscores = User.highscores
    @highscores = @highscores.to_json
    render json: {highscores: @highscores}
  end
  
end