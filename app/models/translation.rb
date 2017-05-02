class Translation < ApplicationRecord
  belongs_to :challenge
  belongs_to :language
end
