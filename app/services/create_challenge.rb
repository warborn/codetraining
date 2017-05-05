class CreateChallenge
	attr_accessor :challenge, :name, :description, :category, :rank, :tags

	def initialize(name: '', description: '', category: '', rank: 1, tags: '', translation: {})
		@name = name
		@description = description
		@category = category
		@rank = rank
		@tags = tags
		@translation = translation
	end

	def build
		self.challenge = Challenge.new({ name: @name, description: @description, category: @category,
																		 rank: @rank, tags: trim_tags })
		challenge.translations << create_translation if @translation[:language_id]
		challenge
	end

	def create
		build
		challenge.save
	end

	def create_translation
		Translation.new(language_id: @translation[:language_id],
										initial_solution: @translation[:initial_solution],
										complete_solution: @translation[:complete_solution],
										example_fixture: @translation[:example_fixture],
										final_fixture: @translation[:final_fixture])
	end

	def trim_tags
		tags.split(',').map { |tag| tag.strip.gsub(/\b(?<!['’`])[a-z]/, &:capitalize) }.join(',')
	end
end