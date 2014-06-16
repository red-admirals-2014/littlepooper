class SessionsController < ApplicationController

  def new
  end

  def google_login
    google_url = "https://accounts.google.com/o/oauth2/auth?" +
                    "response_type=code&"+
                    "client_id=#{Rails.application.secrets.client_id}&"+
                    "redirect_uri=http://localhost:3000/logged_in&"+
                    "scope=email%20profile&"+
                    "state=#{Rails.application.secrets.state}&"
    redirect_to google_url
  end

  def logged_in
    access_code = params[:code]
    first_response = HTTParty.post("https://accounts.google.com/o/oauth2/token?", {body: {client_id: Rails.application.secrets.client_id, client_secret: Rails.application.secrets.client_secret, redirect_uri: "http://localhost:3000/logged_in", grant_type:"authorization_code", code: access_code}})
    access_token = first_response["access_token"]
    user_info = HTTParty.get("https://www.googleapis.com/plus/v1/people/me?", {query: {access_token: access_token}})
    #check if their email is in the database, otherwise write them in. 
    first_name = user_info["name"]["givenName"]
    picture = user_info["image"]["url"]
    email = user_info["emails"][0]["value"]
    if User.find_by_email(email)
      session[:id] = User.find_by_email(email).id
    else
      user = User.create(email: email, username: first_name, password:SecureRandom.hex)
      session[:id] = user.id
    end
    redirect_to root_path
  end


  def create
    user = User.find_by_username(params[:username])
    if user && user.authenticate(params[:password])
      session[:user_id] = user.id
      redirect_to home_path
    else
      render :new
    end
  end

  def destroy
    session[:user_id] = nil
    redirect_to root_path
  end

end