class CreateChallenge
	attr_accessor :challenge, :translation
	attr_reader :errors

	def initialize(challenge_params, translation_params, language)
    @challenge_params = challenge_params
    @translation_params = translation_params
    @language = language
	end

	def build
		self.challenge = Challenge.new(challenge_params)
		challenge.translations = [create_translation]
	end

	def create
		build
		challenge.save
	end

	def errors
		challenge.errors.full_messages
	end

	private
		attr_accessor :challenge_params, :translation_params, :language

		def create_translation
			self.translation = challenge.translations.build(translation_params)
	    translation.language = language
	    translation.save
	    translation
		end
end