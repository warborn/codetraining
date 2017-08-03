class RunnerController < ApplicationController
  before_action :authenticate_user!

	def run
    # execute user's code
    runner_service = CodeRunnerService.new(params)
    response = runner_service.call!

    if params[:attempt]
      # find current user's solution
      translation = Translation.by_language_and_challenge(params[:language], params[:challenge_id])
      solution = current_user.solutions.draft_by_translation(translation).first

      if solution
        # update solution
        solution.answer  = params[:code]
        solution.fixture = params[:fixture]
        solution.status  = response[:result][:completed] ? 'completed' : 'incompleted'
        solution.save
      end
    end

  	render json: response
  end
end