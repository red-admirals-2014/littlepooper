class UsersController < ApplicationController

  def new
    @user = User.new
  end

  def create
    @user = User.new(params_user)
    if @user.save
      sesseion[:user_id] = @user.user_id
      redirect_to root
    else
      render :new
    end
  end

  private

  def params_user
    params.require(:user).permit(:username, :password, :email)
  end

end