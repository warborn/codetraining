class ChallengesController < ApplicationController
  def new
  end

  def train
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
      fixture: "Test.expect(lenguageFavorito.length > 0, 'La cadena esta vacia')\nTest.expect(lenguageFavorito === 'javascript', 'El lenguaje favorito no es javascript')\n"
    }

    examples = { javascript: javascript }
    render json: examples[params[:language].to_sym]
  end
end
