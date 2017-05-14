class UsersController < ApplicationController
	before_action :authenticate_user!

	def solutions
		@solutions = current_user
									.solutions
									.includes(translation: [:challenge, :language])
									.order('challenges.id, solutions.created_at DESC')
	end
end