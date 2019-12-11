class UsersController < ApplicationController

	def index
		@users = User.all
		render json: UsersSerializer.new(@users).serialized_json, include: "**"
	end

  def show
    user_id = params[:id]
    # if current_user_id == user_id.to_i
      user = User.find(user_id)
    #   render json: user, include: :cart_items
    # else
    #   render json: { go_away: true }, status: :unauthorized
    # end
      render json: user, include: :cart_items
  end

  def create
    user = User.create(user_params)
    if user.valid?
      render json: { token: token(user.id), user_id: user.id , username: user.username }
    else
      render json: { errors: user.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private

  def user_params
    params.permit(:username, :password)
  end

end
