class Challenge < ApplicationRecord
	validates :name, presence: true, uniqueness: true
	validates :description, presence: true
	validates :category, presence: true
	validates :rank, presence: true

	has_many :translations

	before_save :transform_tags

	def splitted_tags
		tags.split(',').map(&:upcase)
	end

	private
		# trim whitespaces between tags and capitalizes each word
		def transform_tags
			self.tags = self.tags.gsub(/^,+|,+$/, '').split(',').map { |tag| tag.strip.gsub(/\b(?<!['’`])[a-z]/, &:capitalize) }.join(',')
		end
end
