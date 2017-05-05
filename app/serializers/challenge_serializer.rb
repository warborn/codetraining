class ChallengeSerializer < ActiveModel::Serializer
  attributes :id, :name, :description, :category, :rank, :tags
end