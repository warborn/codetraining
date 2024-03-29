class ChallengesController < ApplicationController
  before_action :authenticate_user!
  before_action :verify_owner, only: [:edit, :update, :destroy]
  before_action :set_translation, only: [:edit, :update]
  before_action :set_language, only: [:new, :create]
  before_action :set_categories_and_ranks, only: [:new, :edit]
  before_action :set_search_options, only: [:index, :search]

  def index
    @challenges = Challenge.includes(:user).order(created_at: :desc).all
  end

  def show
    @solutions_count = Solution.completed.joins(translation: [:challenge]).where('challenges.id = ?', params[:id]).count
    @challenge = Challenge.includes(:user).includes(translations: [:language]).find(params[:id])
  end

  def new
    @translation = Translation.new
    @translation.challenge = Challenge.new
    @translation.language = @language
    render :manage
  end
  
  def create
    challenge_creator = CreateChallenge.new(challenge_params, current_user, @language)
    if challenge_creator.create
      challenge_creator.assign_translation(translation_params)
      @challenge = challenge_creator.challenge
      @translation = challenge_creator.translation
      render json: @translation, status: :created
    else
      render json: { errors: challenge_creator.errors }, status: 422
    end
  end

  def edit
    render :manage
  end

  def update
    @translation.update_attributes(translation_params)
    if @translation.challenge.update_attributes(challenge_params)
      render json: @translation, status: :created
    else
      render json: { errors: @translation.challenge.errors.full_messages }, status: 422
    end
  end

  def destroy
    @challenge = Challenge.find(params[:id])
    @translation = Translation.by_challenge_and_language(params[:id], 'javascript')
    if @translation.destroy
      @challenge.destroy if @challenge.translations.size == 0
      head :no_content
    end
  end

  def search
    finder = ChallengeFinder.new(params)
    @challenges = finder.perform!
    render :index
  end

  def train
  end

  private

  def verify_owner
    challenge = Challenge.find(params[:id])
    if challenge.user_id != current_user.id
      redirect_to root_path, status: 303
    end
  end

  def challenge_params
    params.require(:challenge).permit(:name, :description, :category, :rank, :tags)
  end

  def translation_params
    params.require(:challenge).permit(:initial_solution, :complete_solution, :example_fixture, :final_fixture)
  end

  def set_translation
    @translation = Translation.by_challenge_and_language(params[:id], 'javascript')
  end

  def set_language
    @language = Language.find_by_name('javascript')
  end

  def set_categories_and_ranks
    @categories = Category.pluck(:name).map { |category| [category.capitalize, category] }
    @ranks = [1, 2, 3, 4]
  end

  def set_search_options
    @tag = params[:tag] || '0'
    @order = params[:order_by]
    @name = params[:q]

    @tags = ['operadores', 'control-de-flujo', 'ciclos', 'funciones', 'arreglos'].map do |tag|
      [tag.titleize, tag]
    end
    @tags.unshift(['Selecciona una etiqueta', '0'])

    @order_by = [['Más Reciente', 'latest'], ['Más Antiguo', 'oldest'], ['Fáciles', 'easiest'], ['Difíciles', 'hardest'], ['Nombre', 'name']]
  end
end
