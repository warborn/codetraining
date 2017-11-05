class Challenge < ApplicationRecord
	validates :name, presence: true, uniqueness: true
	validates :description, presence: true
	validates :category, presence: true
	validates :rank, presence: true

	belongs_to :user
	has_many :translations

	scope :oldest,       lambda  { order('challenges.created_at ASC') }
	scope :latest,       lambda  { order('challenges.created_at DESC') }
	scope :easiest,      lambda  { order('challenges.rank ASC') }
	scope :hardest,      lambda  { order('challenges.rank DESC') }
	scope :alphabetical, lambda  { order('challenges.name ASC') }

	scope :by_name,      lambda { |name| where('challenges.name ILIKE ?', "%#{name}%") } 
	scope :by_tag,       lambda  { |tag|  where('challenges.tags ILIKE ?', "%#{tag}%") }

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
