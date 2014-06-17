Rails.application.routes.draw do
  
  root "users#index"

  post '/set_pet_stats', to: "games#set_pet_stats"
  get '/get_pet_stats', to: "games#get_pet_stats"


  post '/flappy_high_score', to: "games#flappy_high_score"

  get '/flappy_high_scores', to: "games#flappy_high_scores"

  get '/google_login', to: "sessions#google_login"

  get '/logged_in', to: "sessions#google_login_callback"

  resources :users, only: [:new, :index, :create] do
    get '/home', to: "games#game"

  end
  
  resources :sessions, only: [:new, :create, :destroy]

end
