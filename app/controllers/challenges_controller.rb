class ChallengesController < ApplicationController
  def index
    @challenges = Challenge.all
  end

  def show
    @challenge = Challenge.find(params[:id])
  end

  def new
  end

  def train
    @translation = Translation.includes(:challenge).first
  end

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

  def example
    javascript = {
      setup: "var lenguageFavorito = '';",
      answer: "// javascript es el lenguaje favorito\n// asignalo a la variable lenguageFavorito\nvar lenguajeFavorito = 'javascript';",
      fixture: "Test.expect(lenguajeFavorito.length > 0, 'La cadena esta vacia')\nTest.expect(lenguajeFavorito === 'javascript', 'El lenguaje favorito no es javascript')\n"
    }

    examples = { javascript: javascript }
    render json: examples[params[:language].to_sym]
  end
end
