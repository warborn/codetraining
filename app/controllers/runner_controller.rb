class RunnerController < ApplicationController
	def run
  	runner = CodeRunner::Runner.new({
  		code: params[:code],
  		fixture: params[:fixture],
  		language: 'javascript'
  	})

  	response = nil
  	t = Thread.new(runner) do |t|
  		response = runner.execute!
  	end
  	t.join

  	render json: response
  end
end