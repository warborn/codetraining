class CodeRunnerService

	def initialize(params)
		@code = params[:code]
		@language_name = 'javascript' # replace with params[:language]) when adding more languages
		@challenge_id = params[:challenge_id]
		@fixture = attempted_fixture(params)
	end

	def call!
		build
		execute_code
	end

	private
		attr_accessor :runner, :language_name, :challenge_id

		def build
			self.runner = CodeRunner::Runner.new({
        code: @code,
        fixture: @fixture,
        language: @language_name
      })
		end

		def execute_code
			response = nil
	  	t = Thread.new(runner) do |t|
	  		response = runner.execute!
	  	end
	  	t.join
	  	response
		end

		def attempted_fixture(params)
			if params[:attempt]
				Translation.by_challenge_and_language(@challenge_id, @language_name).final_fixture
			else
				params[:fixture]
			end
		end
end