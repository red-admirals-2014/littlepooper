class UsersController < ApplicationController

  def new
    @user = User.new
  end

  def index
    @user = User.new
  end

  def create
    @user = User.new(params_user)
    if @user.save 
      session[:user_id] = @user.id
      redirect_to user_home(@user)
    else
      render :new
    end
  end

  private

  def params_user
    params.require(:user).permit(:username, :password, :email, :petname)
  end

end