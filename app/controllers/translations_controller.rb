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
		@solutions = @translation.solutions.completed.first_of_each_user
	end

	def train
		# find existing solution draft from user
		if solution_draft = current_user.solutions.draft_by_translation(@translation).first
			@solution = solution_draft
		else
			# set new solution draft to user
			@solution = current_user.solutions.build({
        answer: @translation.initial_solution,
        fixture: @translation.example_fixture
      })
      @solution.translation = @translation
      @solution.save
		end
	end

	private
		def set_translation
	    @translation = Translation.by_challenge_and_language(params[:id], 'javascript')
	  end
end