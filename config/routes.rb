Rails.application.routes.draw do
  get '/home', to: "games#game"
  get '/login', to: "games#login"
  root "users#index"

  get '/home', to: "users#home_page"

  get '/google_login', to: "sessions#google_login"

  get '/logged_in', to: "sessions#logged_in"

  resources :users

  resources :sessions, only: [:new, :create, :destroy]

end
