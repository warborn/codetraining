require 'rails_helper'
require 'pry'

RSpec.describe CreateChallenge do
	let(:creator) { 
		creator = CreateChallenge.new(
			name: 'Sort array', 
			description: 'Sort the array', 
			category: 'Fundamentos', 
			rank: 1, 
			tags: tags_string) 
	}

	let(:tags_string) { 'array' }

	it 'creates a challenge' do
		creator.build
		expect(creator.challenge.name).to eq('Sort array')
		expect(creator.challenge.description).to eq('Sort the array')
		expect(creator.challenge.category).to eq('Fundamentos')
		expect(creator.challenge.rank).to eq(1)
		expect(creator.challenge.tags).to eq('Array')
	end

	it 'saves the challenge' do
		creator.create
		expect(creator.challenge).not_to be_a_new_record
	end

	describe 'attaching translation to the challenge' do
		it 'saves the challenge and translation' do
			language = FactoryGirl.build_stubbed(:language)
			creator = CreateChallenge.new(
				name: 'Sort array', 
				description: 'Sort the array', 
				category: 'Fundamentos', 
				rank: 1, tags: tags_string, 
				translation: {
					language_id: language.id,
					initial_solution: '',
					complete_solution: '',
					example_fixture: '',
					final_fixture: ''
				}
			)
			
		binding.pry
			creator.create
			expect(creator.challenge.translations.size).to eq(1)
			expect(creator.challenge).not_to be_a_new_record
		end
	end

	describe 'tags string parsing' do
		context 'when given a empty string' do
			let(:tags_string) { '' }
			it 'returns an empty string' do
				tags = creator.trim_tags
				expect(tags).to eq('')
			end
		end

		context 'when given a valid string' do
			let(:tags_string) { ' arrays, sorting , control flow ' }
			it 'trim spaces and capitalizes words from tags' do
				tags = creator.trim_tags
				expect(tags).to eq('Arrays,Sorting,Control Flow')
			end
			
			it 'sets trimmed tags to challenge' do
				creator.build
				expect(creator.challenge.tags).to eq('Arrays,Sorting,Control Flow')
			end
		end
		
	end
end