class RunnerController < ApplicationController
  before_action :authenticate_user!

	def run
    runner_service = CodeRunnerService.new(params)
    response = runner_service.call!

    if params[:attempt] && response[:result][:completed]
    	# solution_saver_service = SolutionSaverService.new(current_user, params)
    	# solution_saver_service.call!
    	solution = current_user.solutions.build({
    		answer: params[:code],
    		fixture: params[:fixture]
  		})

  		solution.translation = Translation.by_language_and_challenge(params[:language], params[:challenge_id])
  		solution.save
    end

  	render json: response
  end
end