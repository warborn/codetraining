class Solution < ApplicationRecord
	belongs_to :user
	belongs_to :translation

	scope :first_of_each_user, lambda { 
		select('DISTINCT ON (solutions.user_id) solutions.id, *')
		.order('solutions.user_id, solutions.created_at ASC')
	}

	scope :completed, lambda { where("solutions.status = 'completed'")}

	scope :draft_by_translation, lambda { |translation|
		where(translation_id: translation.id)
		.where(status: 'incompleted')
	}
end
