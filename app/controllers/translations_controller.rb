class TranslationsController < ApplicationController
	before_action :set_translation, only: [:show, :train]

	def show
		render json: {
			initial_solution: @translation.initial_solution,
			example_fixture: @translation.example_fixture
		}
	end

	def train
	end

	private
		def set_translation
	    @translation = Translation.by_language_and_challenge('javascript', params[:id])
	  end
end