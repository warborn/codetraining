class Translation < ApplicationRecord
  belongs_to :challenge
  belongs_to :language

  scope :language, lambda { |language_name| joins(:language).where(["languages.name = ?", language_name]) }
  scope :challenge, lambda { |challenge_id| joins(:challenge).where(["challenges.id = ?", challenge_id]) }
  scope :by_language_and_challenge, lambda { |language_name, challenge_id| 
  	self.language(language_name).merge(self.challenge(challenge_id)).first
  }
end
