class Api::SessionsController < ApplicationController

  def create
    # debugger
    @user = User.find_by_credentials(
      params[:user][:email],
      params[:user][:password])

    if @user
      # debugger
      login(@user)
      render 'api/users/show'
    else
      render json: ['The email/password you’ve entered is incorrect.'], status: 401
    end
  end

  def destroy
    @user = current_user
    if @user
      logout
      render json: ["Logged out"], status: 200
    else
      render json: ['Nobody signed in'], status: 404
    end
  end

end
