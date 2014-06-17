class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception
  private

  def check_logged
    unless session[:user_id]
      redirect_to root_path
    end
  end

  def current_user
    if session[:user_id]
      User.find(session[:user_id])
    end
  end

  def login(user)
    session[:user_id] = user.id
  end


  def google_url
    "https://accounts.google.com/o/oauth2/auth?" +
                    "response_type=code&"+
                    "client_id=#{Rails.application.secrets.client_id}&"+
                    "redirect_uri=http://little-pooper.herokuapp.com/logged_in&"+
                    "scope=email%20profile&"+
                    "state=#{Rails.application.secrets.state}&"
  end

  def get_user_info(access_code)
    first_response = HTTParty.post("https://accounts.google.com/o/oauth2/token?", {body: {client_id: Rails.application.secrets.client_id, client_secret: Rails.application.secrets.client_secret, redirect_uri: 'http://little-pooper.herokuapp.com/logged_in', grant_type:"authorization_code", code: access_code}})

    access_token = first_response["access_token"]
    user_info = HTTParty.get("https://www.googleapis.com/plus/v1/people/me?", {query: {access_token: access_token}})
    {first_name: user_info["name"]["givenName"], picture: user_info["image"]["url"], email: user_info["emails"][0]["value"]}
  end


end
