class TranslationsController < ApplicationController
  before_action :authenticate_user!
	before_action :set_translation, only: [:show, :train, :solutions]

	def show
		render json: {
			initial_solution: @translation.initial_solution,
			example_fixture: @translation.example_fixture
		}
	end

	def solutions
		@solutions = @translation.solutions.first_of_each_user
	end

	def train
	end

	private
		def set_translation
	    @translation = Translation.by_language_and_challenge('javascript', params[:id])
	  end
end