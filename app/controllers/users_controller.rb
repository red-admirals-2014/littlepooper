class UsersController < ApplicationController

  def index
    @user = User.new
  end

  def create
    @user = User.new(params_user)
    if @user.save 
      login(@user)
      redirect_to user_home_path(@user)
    else
      render :new
    end
  end

  private

  def params_user
    params.require(:user).permit(:username, :password, :email, :petname)
  end

end