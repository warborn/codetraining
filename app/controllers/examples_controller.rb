class ExamplesController < ApplicationController
	def show
		render json: Language.find_by_name(params[:language]).example
	end
end