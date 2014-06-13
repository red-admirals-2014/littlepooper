Rails.application.routes.draw do

  get '/game', to: "games#index"
  get '/stomper', to: "games#stomper"
  root "users#index"

  get '/google_login', to: "sessions#google_login"

  get '/logged_in', to: "sessions#logged_in"

  resources :users

  resources :sessions, only: [:new, :create, :destroy]

end
