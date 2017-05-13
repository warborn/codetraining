class UsersController < ApplicationController
	before_action :authenticate_user!

	def solutions
		@solutions = current_user.solutions
	end
end