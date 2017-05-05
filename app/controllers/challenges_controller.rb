class ChallengesController < ApplicationController
  before_action :set_translation, only: [:edit, :update, :train]

  def index
    @challenges = Challenge.all
  end

  def show
    @challenge = Challenge.find(params[:id])
  end

  def new
    @translation = Translation.new
    @translation.challenge = Challenge.new
    @translation.language = Language.first
    @categories = Category.pluck(:name).map { |category| [category.capitalize, category] }
    render :manage
  end
  
  def create
    @challenge = Challenge.new(challenge_params)
    if @challenge.save
      @translation = @challenge.translations.build(translation_params)
      @translation.language_id = Language.first.id
      @translation.save
      render json: @translation, status: :created
    else
      render json: { errors: @challenge.errors.full_messages }, status: 422
    end
  end

  def edit
    @categories = Category.pluck(:name).map { |category| [category.capitalize, category] }
    render :manage
  end

  def update
    @translation.update_attributes(translation_params)
    if @translation.challenge.update_attributes(challenge_params)
      render json: @translation, status: :created
    else
      render json: { errors: @challenge.errors.full_messages }, status: 422
    end
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

  def set_translation
    language = Language.find_by_name('javascript')
    challenge = Challenge.find(params[:id])
    @translation = Translation.where(language_id: language.id, challenge_id: params[:id]).first
  end
end
