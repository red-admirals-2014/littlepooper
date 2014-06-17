class SessionsController < ApplicationController

  def google_login
    redirect_to google_url
  end

  def google_login_callback
    user_info = get_user_info(params[:code])
    
    if User.find_by_email(user_info[:email])
      user = User.find_by_email(user_info[:email]) 
      login(user)
    else
      user = User.create(email: user_info[:email], username: user_info[:first_name], password:SecureRandom.hex)
      login(user)
    end
    redirect_to user_home_path(user)
  end


  def create
    user = User.find_by_username(params[:username])
    if(user && user.authenticate(params[:password]))
      login(user)
      redirect_to user_home_path(user)
    else
      redirect_to root_path
    end
  end

  def destroy
    session.delete 
    redirect_to root_path
  end

end