class Challenge < ApplicationRecord
	validates :name, presence: true, uniqueness: true
	validates :description, presence: true
	validates :category, presence: true
	validates :rank, presence: true

	has_many :translations

	def splitted_tags
		tags.split(',').map(&:capitalize)
	end
end
