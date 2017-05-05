class TranslationSerializer < ActiveModel::Serializer
  attributes :id, :initial_solution, :complete_solution, :example_fixture, :final_fixture, :language
  belongs_to :challenge

  def language
  	object.language.name
  end
end
