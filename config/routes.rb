Rails.application.routes.draw do
  get '/realgame', to: "games#game"
  get '/game', to: "games#index"
  get '/stomper', to: "games#stomper"
  get '/home', to: "games#home"
  root "users#index"

  get '/home', to: "users#home_page"

  get '/google_login', to: "sessions#google_login"

  get '/logged_in', to: "sessions#logged_in"

  resources :users

  resources :sessions, only: [:new, :create, :destroy]

end
