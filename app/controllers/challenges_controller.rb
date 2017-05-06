class ChallengesController < ApplicationController
  before_action :set_translation, only: [:edit, :update, :train]
  before_action :set_language, only: [:new, :create]

  def index
    @challenges = Challenge.all
  end

  def show
    @challenge = Challenge.find(params[:id])
  end

  def new
    @translation = Translation.new
    @translation.challenge = Challenge.new
    @translation.language = @language
    @categories = Category.pluck(:name).map { |category| [category.capitalize, category] }
    render :manage
  end
  
  def create
    challenge_creator = CreateChallenge.new(challenge_params, translation_params, @language)
    if challenge_creator.create
      @challenge = challenge_creator.challenge
      @translation = challenge_creator.translation
      render json: @translation, status: :created
    else
      render json: { errors: challenge_creator.errors }, status: 422
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

  def set_language
    @language = Language.find_by_name('javascript')
  end
end
