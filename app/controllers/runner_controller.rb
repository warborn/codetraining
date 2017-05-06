class RunnerController < ApplicationController
	def run
    runner_service = CodeRunnerService.new(params)
    response = runner_service.call!

  	render json: response
  end
end