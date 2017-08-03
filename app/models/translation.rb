class Translation < ApplicationRecord
  belongs_to :challenge
  belongs_to :language

  has_many :solutions

  scope :language, lambda { |language_name| joins(:language).where(["languages.name = ?", language_name]) }
  scope :challenge, lambda { |challenge_id| joins(:challenge).where(["challenges.id = ?", challenge_id]) }

  def self.by_challenge_and_language(challenge_id, language_name)
  	self.language(language_name).merge(self.challenge(challenge_id)).first
  end
end
