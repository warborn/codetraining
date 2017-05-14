class CreateChallenge
	attr_accessor :challenge, :translation
	attr_reader :errors

	def initialize(challenge_params, user, language)
    @challenge_params = challenge_params
    @language = language
    @user = user
	end

	def build
		self.challenge = Challenge.new(challenge_params)
		challenge.user = user
	end

	def create
		build
		challenge.save
	end

	def assign_translation(translation_params)
		challenge.translations = [create_translation(translation_params)]
	end

	def errors
		challenge.errors.full_messages
	end

	private
		attr_accessor :challenge_params, :translation_params, :user, :language

		def create_translation(translation_params)
			self.translation = challenge.translations.build(translation_params)
	    translation.language = language
	    translation.save
	    translation
		end
end