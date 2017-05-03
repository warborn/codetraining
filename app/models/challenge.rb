class Challenge < ApplicationRecord
	def splitted_tags
		tags.split(',').map(&:capitalize)
	end
end
