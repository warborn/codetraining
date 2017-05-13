class Solution < ApplicationRecord
	belongs_to :user
	belongs_to :translation

	scope :first_of_each_user, lambda { 
		select('DISTINCT ON (solutions.user_id) solutions.id, *')
		.order('solutions.user_id, solutions.created_at ASC')
	}
end
