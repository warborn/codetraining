class ChallengesController < ApplicationController
  def index
    @challenges = Challenge.all
  end

  def show
    @challenge = Challenge.find(params[:id])
  end

  def new
  end
  
  def create
    @challenge = Challenge.new(challenge_params)
    if @challenge.save
      @translation = @challenge.translations.build(translation_params)
      @translation.language_id = Language.first.id
      @translation.save
      render json: @challenge, status: :created
    else
      render json: { errors: @challenge.errors.full_messages }, status: 422
    end
  end

  def train
    language = Language.find_by_name(params[:language])
    challenge = Challenge.find(params[:id])
    @translation = challenge.translations.where(language_id: language.id).first
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

  private

  def challenge_params
    params.require(:challenge).permit(:name, :description, :category, :rank, :tags)
  end

  def translation_params
    params.require(:challenge).permit(:initial_solution, :complete_solution, :example_fixture, :final_fixture)
  end
end
