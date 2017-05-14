class ChallengesController < ApplicationController
  before_action :authenticate_user!
  before_action :set_translation, only: [:edit, :update]
  before_action :set_language, only: [:new, :create]

  def index
    @challenges = Challenge.includes(:user).all
  end

  def show
    @solutions_count = Solution.joins(translation: [:challenge]).where('challenges.id = ?', params[:id]).count
    @challenge = Challenge.includes(:user).includes(translations: [:language]).find(params[:id])
  end

  def new
    @translation = Translation.new
    @translation.challenge = Challenge.new
    @translation.language = @language
    @categories = Category.pluck(:name).map { |category| [category.capitalize, category] }
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

  def destroy
    @challenge = Challenge.find(params[:id])
    @translation = Translation.by_language_and_challenge('javascript', params[:id])
    if @translation.destroy
      @challenge.destroy if @challenge.translations.size == 0
      head :no_content
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
    @translation = Translation.by_language_and_challenge('javascript', params[:id])
  end

  def set_language
    @language = Language.find_by_name('javascript')
  end
end
